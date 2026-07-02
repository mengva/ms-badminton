import db from "@/server/config/db";
import { staffs, users } from "@/server/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

export class tRPCManageStaffQueries {

    // Get staff info
    public static selectStaffInfo = {
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        position: staffs.position,
        salary: staffs.salary,
    }
    /**
     * Get paginated list of staff members
     */
    public static async list(ctx: MyContext, input: ZodValidationFilter) {
        try {
            const userRole = ctx.userInfo.role;
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            // Get staff with their user info (join with staffs table)
            const staffList = await db
                .select({ ...this.selectStaffInfo })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId)) // Important: only real staff
                .where(eq(users.isActive, true))
                .orderBy(desc(users.createdAt))
                .limit(limit)
                .offset(offset);

            // Count total staff
            const [{ total }] = await db
                .select({ total: count() })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(eq(users.isActive, true));

            const totalPage = Math.ceil(total / limit);

            return HandlerSuccess.success("Staff list retrieved successfully", {
                userRole,
                data: staffList,
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

    /**
     * Get single staff by user ID
     */
    public static async getOne(userId: string) {
        try {
            const [staff] = await db
                .select({ ...this.selectStaffInfo })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(and(eq(users.id, userId), eq(users.isActive, true)))
                .limit(1);

            if (!staff) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Staff member not found",
                });
            }

            return HandlerSuccess.success("Staff retrieved successfully", staff);
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}