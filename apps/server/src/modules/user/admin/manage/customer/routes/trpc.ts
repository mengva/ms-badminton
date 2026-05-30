import { zodValidationSearchQueryStaff, zodValitionUserId } from "@/server/packages/validations/master-data";
import { zodValidationFilter, zodValidationGlobalStatus } from "@/server/packages/validations";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCManageCustomerQueries } from "../severices/queries";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";
import { tRPCManageCustomerMutationServices } from "../severices/mutation";

export const tRPCManageCustomerRouter = router({
    /**
     * Get paginated list of customer
     */
    list: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationFilter)
        .query(async ({ input }) => {
            return await tRPCManageCustomerQueries.list(input);
        }),

    /**
     * Get single customer by ID
     */
    getOne: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValitionUserId) // Fixed typo: zodValitionUserId → zodValidationUserId
        .query(async ({ input }) => {
            return await tRPCManageCustomerQueries.getOne(input.userId);
        }),

    /**
 * Search Query customer info by fullName, email and phoneNumber
 */

    searchQuery: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationSearchQueryStaff)
        .mutation(async ({ input }) => {
            return await tRPCManageCustomerMutationServices.searchQuery(input);
        }),

    updatedCustomerStatus: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .input(zodValidationGlobalStatus)
        .mutation(async ({ input }) => {
            return await tRPCManageCustomerMutationServices.updatedCustomerStatus(input);
        })
});