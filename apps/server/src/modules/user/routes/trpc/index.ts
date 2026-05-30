import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCUserQueries } from "../../services/queries";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCUserRouter = router({
    getUserRole: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .query(async ({ ctx }) => {
            return await tRPCUserQueries.getUserRole(ctx);
        })
});