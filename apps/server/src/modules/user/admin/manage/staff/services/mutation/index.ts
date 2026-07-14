import db from "@/server/config/db";
import { staffs, userCredentials, users } from "@/server/db";
import { ZodValidationCreateNewStaff, ZodValidationSearchQueryStaff } from "@/server/packages/validations/master-data";
import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, Helper, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { tRPCManageStaffQueries } from "../queries";
import { ZodValidationGlobalStatus } from "@/server/packages/validations";

export class tRPCManageStaffMutationServices {
    /**
     * Create a new staff member with user account and credentials
     */
    public static async createNewStaff(ctx: MyContext) {
        try {
            const info = ctx.bodyInfo as ZodValidationCreateNewStaff;
            const userAgent = ctx.userAgent || "";

            console.log("Creating new staff member with info:", info);

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

            // Check if phoneNumber already exists (only active users)
            const existingUserPhoneNumber = await db.query.users.findFirst({
                where: and(
                    eq(users.phoneNumber, info.phoneNumber),
                    eq(users.isActive, true)
                ),
            });

            if (existingUserPhoneNumber) {
                throw new TRPCError({
                    code: "CONFLICT", // Better than FORBIDDEN for duplicate email
                    message: "A user with this phoneNumber already exists.",
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
                        role: "Staff",
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

                // 3. Create staff profile
                await tx.insert(staffs).values({
                    userId: newUser.id,
                    salary: "3500000",
                    position: "Staff",
                    // Add other staff-specific fields if needed
                });

                return HandlerSuccess.success("New staff member added successfully");
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    public static async searchQuery(input: ZodValidationSearchQueryStaff) {
        try {
            const { page, limit, query, isActive } = input;
            const offset = (page - 1) * limit;

            const where: any[] = [];

            const userIsActive = Boolean(isActive === "Active");

            if (query) {
                where.push(
                    or(
                        ilike(users.fullName, `%${query}%`),
                        ilike(users.email, `%${query}%`),
                        ilike(users.phoneNumber, `%${query}%`)
                    )
                );
            }

            // count total
            const totalResult = await db
                .select({ total: count() })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ));

            const total = totalResult[0]?.total ?? 1;
            const queryInfo = { ... tRPCManageStaffQueries.selectStaffInfo };
            // query staff data
            const results = await db
                .select({ ...queryInfo })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ))
                .orderBy(desc(users.createdAt))
                .limit(limit)
                .offset(offset);
            const totalPage = Math.ceil(Number(total) / limit) || 1;
            return HandlerSuccess.success("Queries staff successfully", {
                data: results,
                pagination: {
                    total,
                    page,
                    totalPage,
                    limit,
                },
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    public static async updatedStaffStatus({ status, staffId }: ZodValidationGlobalStatus) {
        try {

            const isUserStatus = Boolean(status === "Active");

            const user = await db.query.users.findFirst({
                where: eq(users.id, staffId)
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found"
                });
            }

            await db.update(users).set({
                isActive: isUserStatus
            }).where(eq(users.id, staffId));

            return HandlerSuccess.success("Updated staff statuses successfully");

        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}