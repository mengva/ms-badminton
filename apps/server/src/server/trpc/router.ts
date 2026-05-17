import { tRPCUserAuthRouter } from "@/server/modules/user/auth/routes/trpc";
import { router } from "./procedures";
import { tRPCManageStaffRouter } from "@/server/modules/user/admin/manage/staff/routes/trpc";
import { tRPCUserRouter } from "@/server/modules/user/routes/trpc";
import { tRPCManageCustomerRouter } from "@/server/modules/user/admin/manage/customer/routes/trpc";
import { tRPCManageCourtOwnerRouter } from "@/server/modules/user/admin/manage/owner/routes/trpc";
import { tRPCManageCourtRouter } from "@/server/modules/user/admin/manage/court/routes/trpc";
import { tRPCManageCourtTypeRouter } from "@/server/modules/user/admin/manage/courtType/routes/trpc";

export const appRouter = router({
    app: router({
        user: router({
            get: tRPCUserRouter,
            auth: tRPCUserAuthRouter,
            admin: router({
                dashboard: router({}),
                master_data: router({
                    staff: tRPCManageStaffRouter,
                    customer: tRPCManageCustomerRouter,
                    owner: tRPCManageCourtOwnerRouter,
                    court: tRPCManageCourtRouter,
                    courtType: tRPCManageCourtTypeRouter,
                }),
            })
        })
    })
});

export type AppRouter = typeof appRouter;