import db from "@/server/config/db";
import { ServerResponseDto, UserRoleDto } from "@/server/packages/types";
import { ZodValidationSignIn, ZodValidationSignUp } from "@/server/packages/validations";
import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, Helper, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { customers, userCredentials, users } from "@/server/db"
import { tokenName } from "@/server/packages/utils";
import { and, eq } from "drizzle-orm";

export class tRPCCustomerAuthServices {
    public static async login(ctx: MyContext): Promise<ServerResponseDto> {
        try {
            const info: ZodValidationSignIn = ctx.bodyInfo;
            const userAgent = ctx.userAgent || null;

            // 1. Validate if user agent exists
            if (!userAgent) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User agent is required for security verification"
                });
            }

            // 2. Query user by email, role, and active status
            // Removed userAgent from the 'where' clause to allow login from new devices
            const userInfo = await db.query.users.findFirst({
                where: (users, { eq, and }) => and(
                    eq(users.email, info.email),
                    eq(users.isActive, true),
                    eq(users.role, "Customer")
                ),
                with: {
                    credentials: true
                }
            });

            // 3. Check if user exists
            if (!userInfo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid credentials or account is inactive or permission"
                });
            }

            const DUMMY_HASH = "$2b$10$invalidhashfortimingprotection00000000000000000000000";
            const passwordHash = userInfo.credentials?.passwordHash ?? DUMMY_HASH;

            // 4. Verify password with bcrypt
            const match = await Helper.bcryptCompare(info.password, passwordHash);
            if (!match) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid credentials"
                });
            }

            // 5. Update the latest userAgent in the database
            // This ensures the DB stays synced with the current device
            await db.update(users)
                .set({ userAgent: userAgent })
                .where(eq(users.id, userInfo.id));

            // 6. Prepare JWT Payload
            const userPayload = {
                userId: userInfo.id,
                role: userInfo.role as UserRoleDto,
                userAgent: userAgent,
            };

            // 7. Generate and set access token in cookies
            const token = await Helper.generateToken(userPayload);

            ctx.setCookie(tokenName, token, Helper.cookieOption);

            ctx.userInfo = {
                userId: userInfo.id,
                role: userInfo.role as UserRoleDto
            }

            return HandlerSuccess.success("Sign in successful");
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }


    public static async register(ctx: MyContext): Promise<ServerResponseDto> {
        try {

            const info = ctx.bodyInfo as ZodValidationSignUp;

            const userAgent = ctx.userAgent || null;

            // 1. Validate if user agent exists
            if (!userAgent) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User agent is required for security verification"
                });
            }

            // 2. Query user by email and phone number
            // Removed userAgent from the 'where' clause to allow login from new devices
            const existingUser = await db.query.users.findFirst({
                where: (users, { or, eq }) =>
                    or(
                        eq(users.email, info.email),
                        eq(users.phoneNumber, info.phoneNumber)
                    )
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Email or phone number already exists"
                });
            }

            const hashPassword = await Helper.bcryptHash(info.password);

            return await db.transaction(async tx => {
                const [{ userId }] = await tx.insert(users).values({
                    fullName: info.fullName,
                    email: info.email,
                    phoneNumber: info.phoneNumber,
                    role: "Customer",
                    userAgent: userAgent,
                }).returning({
                    userId: users.id
                });

                await tx.insert(userCredentials).values({
                    userId,
                    passwordHash: hashPassword
                });

                await tx.insert(customers).values({
                    userId,
                    membershipType: "Regular",
                });

                return HandlerSuccess.success("SignUp successfully");
            });

        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

}