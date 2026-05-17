import { zodValidationSendOTPToEmail, zodValidationServerResetPassword, zodValidationSignIn, zodValidationSignInOTP } from "@/server/packages/validations/auth";
import { publicProcedure, router } from "@/server/server/trpc/procedures";
import { tRPCUserAuthMutationServices } from "../services/mutation";
import { tRPCUserAuthMiddleware } from "@/server/middleware/authTRPC";

export const tRPCUserAuthRouter = router({

    signIn: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .input(zodValidationSignIn)
        .mutation(async ({ input, ctx }) => {
            ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
            return await tRPCUserAuthMutationServices.signIn(ctx);
        }),

    sendCodeSignInOTP: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .input(zodValidationSendOTPToEmail)
        .mutation(async ({ input, ctx }) => {
            ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
            return await tRPCUserAuthMutationServices.sendCodeSignInOTP(ctx);
        }),

    resendCodeSignInOTP: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .mutation(async ({ ctx }) => {
            return await tRPCUserAuthMutationServices.resendCodeSignInOTP(ctx);
        }),

    signInOTP: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .input(zodValidationSignInOTP)
        .mutation(async ({ input, ctx }) => {
            ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
            return await tRPCUserAuthMutationServices.signInOTP(ctx);
        }),

    signOut: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAuth)
        .mutation(async ({ ctx }) => {
            return await tRPCUserAuthMutationServices.signOut(ctx);
        }),

    sendCodeResetPassword: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .input(zodValidationSendOTPToEmail)
        .mutation(async ({ input, ctx }) => {
            ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
            return await tRPCUserAuthMutationServices.sendCodeResetPassword(ctx);
        }),

    resendCode: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .mutation(async ({ ctx }) => {
            return await tRPCUserAuthMutationServices.resendCode(ctx);
        }),

    resetPassword: publicProcedure
        .use(tRPCUserAuthMiddleware.isUserAlreadyAuth)
        .input(zodValidationServerResetPassword)
        .mutation(async ({ input, ctx }) => {
            ctx.bodyInfo = { ...input }; // Store the original input for logging or debugging purposes
            return await tRPCUserAuthMutationServices.resetPassword(ctx);
        })

});