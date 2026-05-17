import db from "@/server/config/db";
import { staffs, userCredentials, users } from "@/server/db";
import { ZodValidationAddNewStaff } from "@/server/packages/validations/master-data";
import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, Helper, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export class tRPCManageStaffMutationServices {
    /**
     * Create a new staff member with user account and credentials
     */
    public static async addNewStaff(ctx: MyContext) {
        try {
            const info = ctx.bodyInfo as ZodValidationAddNewStaff;
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
                    salary: info.salary,
                    position: info.position,
                    // Add other staff-specific fields if needed
                });

                return HandlerSuccess.success("New staff member added successfully");
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}