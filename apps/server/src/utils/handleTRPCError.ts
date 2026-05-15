import { TRPCError } from "@trpc/server";
import { ErrorHandler } from "@/server/packages/utils/handleError";
import { ServerErrorDto, TRPCCodeError } from "@/server/packages/types/constants/variables";

export class tRPCErrorServices {
    public static message(message: string, code: TRPCCodeError) {
        throw new TRPCError({
            code,
            message
        });
    }

    public static tRPCError(error: ServerErrorDto) {
        const message = ErrorHandler.getErrorMessage(error);
        if (error instanceof TRPCError) {
            let code = error.code as TRPCCodeError;
            throw this.message(message, code);
        }
        throw new Error(message);
    }
}