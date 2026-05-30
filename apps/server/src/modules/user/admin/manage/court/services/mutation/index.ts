import db from "@/server/config/db";
import { courtOwners, courts, courtTypes, images, users } from "@/server/db";
import { ServerResponseDto } from "@/server/packages/types";
import { ZodValidationAddCourtInfo, ZodValidationAddCourtInfoAndImage, ZodValidationSearchQueryCourt } from "@/server/packages/validations/master-data";
import { HandlerSuccess, SecureFileUploadServices, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { tRPCManageCourtQueries } from "../queries";

export class tRPCManageCourtMutationServices {
    /**
     * Adds a new court with its images.
     * @param ctx - tRPC context (contains authenticated user info)
     * @returns Success response
     */
    public static async createNewCourtInfoAndImage(
        input: ZodValidationAddCourtInfoAndImage
    ): Promise<ServerResponseDto> {
        try {
            const { courtType, files, ...courtInfo } = input;

            // === Validation: Court Type ===
            const courtTypeInfo = await db.query.courtTypes.findFirst({
                where: and(
                    eq(courtTypes.typeName, courtType),
                    eq(courtTypes.isActive, true)
                ),
            });

            if (!courtTypeInfo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Court type not found",
                });
            }

            // === Validation: Main Court Owner ===
            const courtOwnerInfo = await db.query.courtOwners.findFirst({
                where: eq(courtOwners.isMain, true),
            });

            if (!courtOwnerInfo) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "No main court owner found in the system",
                });
            }

            // === Upload Images to Cloudinary ===
            const cloudFiles = await SecureFileUploadServices.uploadCloudinaryImageFiles(files);

            if (!cloudFiles || cloudFiles.length === 0) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to upload images to cloud storage",
                });
            }

            // === Use Transaction for Data Consistency ===
            return await db.transaction(async (tx) => {
                // Insert court
                const [newCourt] = await tx
                    .insert(courts)
                    .values({
                        ...courtInfo,
                        typeId: courtTypeInfo.id,
                        ownerId: courtOwnerInfo.userId,
                    })
                    .returning({ id: courts.id });

                if (!newCourt?.id) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create court record",
                    });
                }

                // Insert images
                await tx.insert(images).values(
                    cloudFiles.map((cloudFile) => ({
                        courtId: newCourt.id,
                        imageKey: cloudFile.cloudinaryId,
                        width: cloudFile.width,
                        height: cloudFile.height,
                        url: cloudFile.imageUrl,
                        type: "Court" as const,
                        size: cloudFile.size,
                    }))
                );

                return HandlerSuccess.success("Court and images added successfully");
            });


        } catch (error) {
            // Let your utility handle logging + standardization
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    public static async createNewCourtInfo(
        input: ZodValidationAddCourtInfo
    ): Promise<ServerResponseDto> {
        try {
            const { courtType, ...courtInfo } = input;

            // === Validation: Court Type ===
            const courtTypeInfo = await db.query.courtTypes.findFirst({
                where: and(
                    eq(courtTypes.typeName, courtType),
                    eq(courtTypes.isActive, true)
                ),
            });

            if (!courtTypeInfo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Court type not found",
                });
            }

            // === Validation: Main Court Owner ===
            const courtOwnerInfo = await db.query.courtOwners.findFirst({
                where: eq(courtOwners.isMain, true),
            });

            if (!courtOwnerInfo) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "No main court owner found in the system",
                });
            }

            await db
                .insert(courts)
                .values({
                    ...courtInfo,
                    typeId: courtTypeInfo.id,
                    ownerId: courtOwnerInfo.userId,
                })
                .returning({ id: courts.id });

            return HandlerSuccess.success("Court added successfully");

        } catch (error) {
            // Let your utility handle logging + standardization
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    public static async searchQuery(input: ZodValidationSearchQueryCourt) {
        try {
            const { page, limit, query, isActive } = input;
            const offset = (page - 1) * limit;

            const where: any[] = [];

            const userIsActive = Boolean(isActive === "Active");

            if (query) {
                where.push(
                    or(
                        ilike(courts.courtName, `%${query}%`),
                        ilike(courts.location, `%${query}%`),
                    )
                );
            }

            // count total
            const totalResult = await db
                .select({ total: count() })
                .from(courts)
                .innerJoin(
                    users, and(
                        eq(users.id, courts.ownerId),
                        eq(users.isActive, true)
                    )
                )
                .where(and(
                    ...where,
                    eq(courts.isActive, userIsActive)
                ));

            const total = totalResult[0]?.total ?? 1;
            // query court data
            const results = await db
                .select({ ...tRPCManageCourtQueries.selectCourtInfo })
                .from(users)
                .innerJoin(
                    users, and(
                        eq(users.id, courts.ownerId),
                        eq(users.isActive, true)
                    )
                )
                .where(
                    and(
                        ...where,
                        eq(courts.isActive, userIsActive)
                    )
                )
                .orderBy(desc(courts.createdAt))
                .limit(limit)
                .offset(offset);
            const totalPage = Math.ceil(Number(total) / limit) || 1;
            return HandlerSuccess.success("Queries court successfully", {
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