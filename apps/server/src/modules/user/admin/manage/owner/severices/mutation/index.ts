import db from "@/server/config/db";
import { courtOwners, userCredentials, users } from "@/server/db";
import { ZodValidationAddCourtOwner } from "@/server/packages/validations/master-data";
import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, Helper, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export class tRPCManageOwnerMutationServices {
    /**
     * Create a new owner member with user account and credentials
     */
    public static async addNewOwner(ctx: MyContext) {
        try {
            const info = ctx.bodyInfo as ZodValidationAddCourtOwner;
            const userAgent = ctx.userAgent || "";

            // Check if email already exists (only active users)
            const existingUser = await db.query.users.findFirst({
                where: and(
                    eq(users.email, info.email),
                    eq(users.isActive, true)
                ),
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT", // Better than FORBIDDEN for duplicate email
                    message: "A user with this email already exists.",
                });
            }

            const hashedPassword = await Helper.bcryptHash(info.password);

            return await db.transaction(async (tx) => {
                // 1. Create user
                const [newUser] = await tx
                    .insert(users)
                    .values({
                        fullName: info.fullName,
                        email: info.email,
                        phoneNumber: info.phoneNumber,
                        role: "Owner",
                        userAgent,
                    })
                    .returning({
                        id: users.id
                    });

                // 2. Create credentials
                await tx.insert(userCredentials).values({
                    passwordHash: hashedPassword,
                    userId: newUser.id,
                });

                // 3. Create owner profile
                await tx.insert(courtOwners).values({
                    userId: newUser.id,
                    companyName: info.companyName,
                    address: info.address,
                    // Add other owner-specific fields if needed
                });

                return HandlerSuccess.success("New owner member added successfully");
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}