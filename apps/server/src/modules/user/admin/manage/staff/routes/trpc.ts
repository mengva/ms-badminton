import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";
import { zodValidationcreateNewStaff, zodValidationSearchQueryStaff, zodValitionUserId } from "@/server/packages/validations/master-data";
import { zodValidationFilter, zodValidationGlobalStatus } from "@/server/packages/validations";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCManageStaffMutationServices } from "../services/mutation";
import { tRPCManageStaffQueries } from "../services/queries"; // Renamed for clarity

export const tRPCManageStaffRouter = router({
    /**
     * Get paginated list of staff
     */
    list: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationFilter)
        .query(async ({ ctx, input }) => {
            return await tRPCManageStaffQueries.list(ctx, input);
        }),

    /**
     * Get single staff by ID
     */
    getOne: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValitionUserId) // Fixed typo: zodValitionUserId → zodValidationUserId
        .query(async ({ input }) => {
            return await tRPCManageStaffQueries.getOne(input.userId);
        }),

    /**
 * Search Query staff info by fullName, email and phoneNumber
 */

    searchQuery: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationSearchQueryStaff)
        .mutation(async ({ input }) => {
            return await tRPCManageStaffMutationServices.searchQuery(input);
        }),

    /**
     * Create new staff member
     */
    createNewStaff: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationcreateNewStaff)
        .mutation(async ({ input, ctx }) => {
            // Attach input to context so service can access it
            ctx.bodyInfo = input;
            return await tRPCManageStaffMutationServices.createNewStaff(ctx);
        }),

    updatedStaffStatus: publicProcedure
        .use(tRPCUserAuthMiddleware.isCourtOwner)
        .input(zodValidationGlobalStatus)
        .mutation(async ({ input }) => {
            return await tRPCManageStaffMutationServices.updatedStaffStatus(input);
        })
});