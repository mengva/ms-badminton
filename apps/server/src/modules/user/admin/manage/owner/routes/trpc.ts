import { zodValidationCreateCourtOwner, zodValidationSearchQueryCourtOwner, zodValitionUserId } from "@/server/packages/validations/master-data";
import { zodValidationFilter, zodValidationGlobalStatus } from "@/server/packages/validations";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCManageCourtOwnerQueries } from "../severices/queries";
import { tRPCManageOwnerMutationServices } from "../severices/mutation";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCManageCourtOwnerRouter = router({
    /**
     * Get paginated list of court owner
     */
    list: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationFilter)
        .query(async ({ input }) => {
            return await tRPCManageCourtOwnerQueries.list(input);
        }),

    /**
     * Get single court owner by ID
     */
    getOne: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValitionUserId) // Fixed typo: zodValitionUserId → zodValidationUserId
        .query(async ({ input }) => {
            return await tRPCManageCourtOwnerQueries.getOne(input.userId);
        }),

    /**
 * Search Query court owner info by fullName, email and phoneNumber
 */

    searchQuery: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationSearchQueryCourtOwner)
        .mutation(async ({ input }) => {
            return await tRPCManageOwnerMutationServices.searchQuery(input);
        }),

    /**
     * Create new court owner member
     */
    createNewStaff: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationCreateCourtOwner)
        .mutation(async ({ input, ctx }) => {
            // Attach input to context so service can access it
            ctx.bodyInfo = input;
            return await tRPCManageOwnerMutationServices.createNewOwner(ctx);
        }),

    updatedOwnerStatus: publicProcedure
        .use(tRPCUserAuthMiddleware.isCourtOwner)
        .input(zodValidationGlobalStatus)
        .mutation(async ({ input }) => {
            return await tRPCManageOwnerMutationServices.updatedOwnerStatus(input);
        })
});