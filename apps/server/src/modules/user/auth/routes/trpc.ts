import { zodValidationSendOTPToEmail, zodValidationServerResetPassword, zodValidationSignIn, zodValidationSignInOTP } from "@/server/packages/validations/auth";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCUserAuthServices } from "../services/mutation";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCUserAuthRouter = router({
    signIn: publicProcedure.input(zodValidationSignIn).use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ input, ctx }) => {
        ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
        return await tRPCUserAuthServices.signIn(ctx);
    }),
    sendCodeSignInOTP: publicProcedure.input(zodValidationSendOTPToEmail).use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ input, ctx }) => {
        ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
        return await tRPCUserAuthServices.sendCodeSignInOTP(ctx);
    }),
    resendCodeSignInOTP: publicProcedure.use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ ctx }) => {
        return await tRPCUserAuthServices.resendCodeSignInOTP(ctx);
    }),
    signInOTP: publicProcedure.input(zodValidationSignInOTP).use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ input, ctx }) => {
        ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
        return await tRPCUserAuthServices.signInOTP(ctx);
    }),
    signOut: publicProcedure.use(tRPCUserAuthMiddleware.isUserAuth).mutation(async ({ ctx }) => {
        return await tRPCUserAuthServices.signOut(ctx);
    }),
    sendCodeResetPassword: publicProcedure.input(zodValidationSendOTPToEmail).use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ input, ctx }) => {
        ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
        return await tRPCUserAuthServices.sendCodeResetPassword(ctx);
    }),
    resendCode: publicProcedure.use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ ctx }) => {
        return await tRPCUserAuthServices.resendCode(ctx);
    }),
    resetPassword: publicProcedure.input(zodValidationServerResetPassword).use(tRPCUserAuthMiddleware.isUserAlreadyAuth).mutation(async ({ input, ctx }) => {
        ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
        return await tRPCUserAuthServices.resetPassword(ctx);
    })
});