import { MyContext } from "@/server/server/trpc/context";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";

export class tRPCUserQueries {
    public static async getUserRole(ctx: MyContext) {
        try {

            const userRole = ctx.userInfo.role ?? "";

            return HandlerSuccess.success("User Role retrieved successful?", userRole);

        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}