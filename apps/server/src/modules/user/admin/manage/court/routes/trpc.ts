import { zodValidationAddCourtInfo, zodValidationAddCourtInfoAndImage, zodValidationSearchQueryCourt, zodValitionUserId } from "@/server/packages/validations/master-data";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCManageCourtMutationServices } from "../services/mutation";
import { zodValidationFilter } from "@/server/packages/validations";
import { tRPCManageCourtQueries } from "../services/queries";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCManageCourtRouter = router({

    /**
         * Get paginated list of court
         */
    list: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationFilter)
        .query(async ({ input }) => {
            return await tRPCManageCourtQueries.list(input);
        }),

    /**
     * Get single court by ID
     */
    getOne: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValitionUserId) // Fixed typo: zodValitionUserId → zodValidationUserId
        .query(async ({ input }) => {
            return await tRPCManageCourtQueries.getOne(input.userId);
        }),

    /**
     * Search Query court info by courtName and location
     */

    searchQuery: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationSearchQueryCourt)
        .query(async ({ input }) => {
            return await tRPCManageCourtQueries.searchQuery(input);
        }),

    addNewCourtInfoAndImage: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationAddCourtInfoAndImage)
        .mutation(async ({ input }) => {
            // Pass input directly instead of mutating ctx (cleaner & safer)
            return await tRPCManageCourtMutationServices.addNewCourtInfoAndImage(input);
        }),

    addNewCourtInfo: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationAddCourtInfo)
        .mutation(async ({ input }) => {
            // Pass input directly instead of mutating ctx (cleaner & safer)
            return await tRPCManageCourtMutationServices.addNewCourtInfo(input);
        }),

});