import db from "@/server/config/db";
import { staffs, users } from "@/server/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { ZodValidationSearchQueryStaff } from "@/server/packages/validations/master-data";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";

export class tRPCManageStaffQueries {

    // Get staff info
    private static selectStaffInfo = {
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
    public static async list(input: ZodValidationFilter) {
        try {
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            // Get staff with their user info (join with staffs table)
            const staffList = await db
                .select({ ...this.selectStaffInfo })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId)) // Important: only real staff
                .where(eq(users.isActive, true))
                .orderBy(desc(users.updatedAt))
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
                .from(staffs)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ));

            const total = totalResult[0]?.total ?? 1;
            // query staff data
            const results = await db
                .select({ ...this.selectStaffInfo })
                .from(users)
                .innerJoin(staffs, eq(users.id, staffs.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ))
                .orderBy(desc(staffs.createdAt))
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
}