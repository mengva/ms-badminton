import db from "@/server/config/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";
import { courts, users } from "@/server/db";

export class tRPCManageCourtQueries {

    // Get court info
    public static selectCourtInfo = {
        id: courts.id,
        courtName: courts.courtName,
        location: courts.location,
        isActive: courts.isActive,
        status: courts.status,
        createdAt: courts.createdAt,
        updatedAt: courts.updatedAt,
        fullName: users.fullName,
        role: users.role,
    }
    /**
     * Get paginated list of court members
     */
    public static async list(input: ZodValidationFilter) {
        try {
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            // Get court with their user info (join with courts table)
            const courtList = await db
                .select({ ...this.selectCourtInfo })
                .from(courts)
                .innerJoin(
                    users, and(
                        eq(users.id, courts.ownerId),
                        eq(users.isActive, true)
                    )
                )
                .where(eq(courts.isActive, true))
                .orderBy(desc(courts.createdAt))
                .limit(limit)
                .offset(offset);

            // Count total court
            const [{ total }] = await db
                .select({ total: count() })
                .from(courts)
                .innerJoin(
                    users, and(
                        eq(users.id, courts.ownerId),
                        eq(users.isActive, true)
                    )
                )
                .where(eq(courts.isActive, true));

            const totalPage = Math.ceil(total / limit);

            return HandlerSuccess.success("Court list retrieved successfully", {
                data: courtList,
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
     * Get single court by user ID
     */
    public static async getOne(userId: string) {
        try {
            const [court] = await db
                .select({ ...this.selectCourtInfo })
                .from(courts)
                .innerJoin(
                    users, and(
                        eq(users.id, courts.ownerId),
                        eq(users.isActive, true)
                    )
                )
                .where(and(
                    eq(courts.id, userId),
                    eq(courts.isActive, true))
                )
                .limit(1);

            if (!court) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Court member not found",
                });
            }

            return HandlerSuccess.success("Court retrieved successfully", court);
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}