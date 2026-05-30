import db from "@/server/config/db";
import { courts, courtTypes, users } from "@/server/db";
import { ServerResponseDto } from "@/server/packages/types";
import { ZodValidationAddCourtTypeInfo, ZodValidationSearchQueryCourt } from "@/server/packages/validations/master-data";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { tRPCManageCourtTypeQueries } from "../queries";

export class tRPCManageCourtTypeMutationServices {
    /**
     * Adds a new court with its images.
     * @param ctx - tRPC context (contains authenticated user info)
     * @returns Success response
     */
    public static async createNewCourtTypeInfo(
        input: ZodValidationAddCourtTypeInfo
    ): Promise<ServerResponseDto> {
        try {
            const { typeName } = input;

            // === Validation: Court Type ===
            const courtTypeInfo = await db.query.courtTypes.findFirst({
                where: and(
                    eq(courtTypes.typeName, typeName),
                    eq(courtTypes.isActive, true)
                ),
            });

            if (courtTypeInfo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Court type is already existing",
                });
            }

            await db.insert(courtTypes).values(input);

            return HandlerSuccess.success("New courtType added successfully");

        } catch (error) {
            // Let your utility handle logging + standardization
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
                tRPCManageCourtTypeQueries.whereCondition
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
                .select(tRPCManageCourtTypeQueries.selectCourtInfo)
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