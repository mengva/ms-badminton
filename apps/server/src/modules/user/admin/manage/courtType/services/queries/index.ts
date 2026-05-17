import db from "@/server/config/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { courts, courtTypes, users } from "@/server/db";
import { ZodValidationSearchQueryCourt } from "@/server/packages/validations/master-data";

export class tRPCManageCourtTypeQueries {

    private static selectCourtInfo = {
        id: courts.id,
        courtName: courts.courtName,
        location: courts.location,
        isActive: courts.isActive,
        status: courts.status,
        createdAt: courts.createdAt,
        updatedAt: courts.updatedAt,
        typeName: courtTypes.typeName,
        description: courtTypes.description,
        hourlyRate: courtTypes.hourlyRate,
        ownerFullName: users.fullName,     // renamed for clarity
        ownerRole: users.role,
    };

    private static whereCondition = (
        eq(courts.isActive, true),
        eq(users.isActive, true),
        eq(courtTypes.isActive, true)
    )

    /**
     * Get paginated list of courts with owner and type info
     */
    public static async list(input: ZodValidationFilter) {
        try {
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            const courtList = await db
                .select(this.selectCourtInfo)
                .from(courts)
                .innerJoin(courtTypes, eq(courts.typeId, courtTypes.id))
                .innerJoin(users, eq(courts.ownerId, users.id))
                .where(and(this.whereCondition))
                .orderBy(desc(courts.updatedAt))
                .limit(limit)
                .offset(offset);

            // Count total
            const [{ total }] = await db
                .select({ total: count() })
                .from(courts)
                .innerJoin(courtTypes, eq(courts.typeId, courtTypes.id))
                .innerJoin(users, eq(courts.ownerId, users.id))
                .where(and(this.whereCondition));

            const totalPage = Math.ceil(total / limit);

            return HandlerSuccess.success("Court list retrieved successfully", {
                data: courtList,
                pagination: { total, page, totalPage, limit },
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    /**
     * Get single court by court ID
     */
    public static async getOne(courtId: string) {
        try {
            const [court] = await db
                .select(this.selectCourtInfo)
                .from(courts)
                .innerJoin(courtTypes, eq(courts.typeId, courtTypes.id))
                .innerJoin(users, eq(courts.ownerId, users.id))
                .where(
                    and(
                        eq(courts.id, courtId),
                        this.whereCondition
                    )
                )
                .limit(1);

            if (!court) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Court not found",
                });
            }

            return HandlerSuccess.success("Court retrieved successfully", court);
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    /**
     * Search courts with pagination and filters
     */
    public static async searchQuery(input: ZodValidationSearchQueryCourt) {
        try {
            const { page, limit, query, isActive } = input;
            const offset = (page - 1) * limit;

            const conditions = [];

            // Filter by active status
            const courtActive = isActive === "Active";
            conditions.push(eq(courts.isActive, courtActive));

            // Search query
            if (query?.trim()) {
                conditions.push(
                    or(
                        ilike(courts.courtName, `%${query}%`),
                        ilike(courts.location, `%${query}%`)
                    )
                );
            }

            const whereClause = and(
                ...conditions,
                this.whereCondition
            );

            // Count total records
            const [{ total }] = await db
                .select({ total: count() })
                .from(courts)
                .innerJoin(courtTypes, eq(courts.typeId, courtTypes.id))
                .innerJoin(users, eq(courts.ownerId, users.id))
                .where(whereClause);

            // Fetch data
            const results = await db
                .select(this.selectCourtInfo)
                .from(courts)
                .innerJoin(courtTypes, eq(courts.typeId, courtTypes.id))
                .innerJoin(users, eq(courts.ownerId, users.id))
                .where(whereClause)
                .orderBy(desc(courts.createdAt))
                .limit(limit)
                .offset(offset);

            const totalPage = Math.ceil((total || 0) / limit) || 1;

            return HandlerSuccess.success("Courts searched successfully", {
                data: results,
                pagination: {
                    total: total || 0,
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