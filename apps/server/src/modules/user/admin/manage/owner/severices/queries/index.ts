import db from "@/server/config/db";
import { courtOwners, users } from "@/server/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

export class tRPCManageCourtOwnerQueries {

    // Get customer info
    public static selectCourtOwnerInfo = {
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        companyName: courtOwners.companyName,
        address: courtOwners.address,
    }
    /**
     * Get paginated list of owner members
     */
    public static async list(input: ZodValidationFilter) {
        try {
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            // Get owner with their user info (join with courtOwners table)
            const ownerList = await db
                .select({ ...this.selectCourtOwnerInfo })
                .from(users)
                .innerJoin(courtOwners, eq(users.id, courtOwners.userId)) // Important: only real owner
                .where(eq(users.isActive, true))
                .orderBy(desc(users.createdAt))
                .limit(limit)
                .offset(offset);

            // Count total owner
            const [{ total }] = await db
                .select({ total: count() })
                .from(users)
                .innerJoin(courtOwners, eq(users.id, courtOwners.userId))
                .where(eq(users.isActive, true));

            const totalPage = Math.ceil(total / limit);

            return HandlerSuccess.success("Owner list retrieved successfully", {
                data: ownerList,
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
     * Get single owner by user ID
     */
    public static async getOne(userId: string) {
        try {
            const [owner] = await db
                .select({ ...this.selectCourtOwnerInfo })
                .from(users)
                .innerJoin(courtOwners, eq(users.id, courtOwners.userId))
                .where(and(
                    eq(users.id, userId),
                    eq(users.isActive, true))
                )
                .limit(1);

            if (!owner) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Owner member not found",
                });
            }

            return HandlerSuccess.success("Owner retrieved successfully", owner);
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}