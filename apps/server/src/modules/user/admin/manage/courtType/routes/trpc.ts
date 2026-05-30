import { zodValidationAddCourtTypeInfo, zodValidationSearchQueryCourt, zodValitionUserId } from "@/server/packages/validations/master-data";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { zodValidationFilter } from "@/server/packages/validations";
import { tRPCManageCourtTypeQueries } from "../services/queries";
import { tRPCManageCourtTypeMutationServices } from "../services/mutation";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCManageCourtTypeRouter = router({

    /**
         * Get paginated list of court type
         */
    list: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationFilter)
        .query(async ({ input }) => {
            return await tRPCManageCourtTypeQueries.list(input);
        }),

    /**
     * Get paginated list of court type
     */
    getTypeList: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .query(async () => {
            return await tRPCManageCourtTypeQueries.getTypeList();
        }),

    /**
     * Get single court type by ID
     */
    getOne: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValitionUserId) // Fixed typo: zodValitionUserId → zodValidationUserId
        .query(async ({ input }) => {
            return await tRPCManageCourtTypeQueries.getOne(input.userId);
        }),

    /**
     * Search Query court type info by courtName and location
     */

    searchQuery: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationSearchQueryCourt)
        .mutation(async ({ input }) => {
            return await tRPCManageCourtTypeMutationServices.searchQuery(input);
        }),

    createNewCourtTypeInfo: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationAddCourtTypeInfo)
        .mutation(async ({ input }) => {
            // Pass input directly instead of mutating ctx (cleaner & safer)
            return await tRPCManageCourtTypeMutationServices.createNewCourtTypeInfo(input);
        }),

});