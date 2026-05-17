import db from "@/server/config/db";
import { courtTypes } from "@/server/db";
import { ServerResponseDto } from "@/server/packages/types";
import { ZodValidationAddCourtTypeInfo } from "@/server/packages/validations/master-data";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export class tRPCManageCourtTypeMutationServices {
    /**
     * Adds a new court with its images.
     * @param ctx - tRPC context (contains authenticated user info)
     * @returns Success response
     */
    public static async addNewCourtTypeInfo(
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
}