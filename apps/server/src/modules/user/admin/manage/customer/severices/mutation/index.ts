import db from "@/server/config/db";
import { customers, users } from "@/server/db";
import { ZodValidationSearchQueryCustomer } from "@/server/packages/validations/master-data";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { tRPCManageCustomerQueries } from "../queries";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { ZodValidationGlobalStatus } from "@/server/packages/validations";
import { TRPCError } from "@trpc/server";

export class tRPCManageCustomerMutationServices {
    public static async searchQuery(input: ZodValidationSearchQueryCustomer) {
        try {
            const { page, limit, query, isActive } = input;
            const offset = (page - 1) * limit;

            const where: any[] = [];

            const userIsActive = Boolean(isActive === "Active");

            if (query) {
                where.push(
                    or(
                        ilike(users.fullName, `%${query}%`),
                        ilike(users.email, `%${query}%`),
                        ilike(users.phoneNumber, `%${query}%`)
                    )
                );
            }

            // count total
            const totalResult = await db
                .select({ total: count() })
                .from(users)
                .innerJoin(customers, eq(users.id, customers.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ));

            const total = totalResult[0]?.total ?? 1;
            // query customer data
            const results = await db
                .select({ ...tRPCManageCustomerQueries.selectCustomerInfo })
                .from(users)
                .innerJoin(customers, eq(users.id, customers.userId))
                .where(and(
                    ...where,
                    eq(users.isActive, userIsActive)
                ))
                .orderBy(desc(customers.createdAt))
                .limit(limit)
                .offset(offset);
            const totalPage = Math.ceil(Number(total) / limit) || 1;
            return HandlerSuccess.success("Queries customer successfully", {
                data: results,
                pagination: {
                    total,
                    page,
                    totalPage,
                    limit,
                },
            });
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }

    public static async updatedCustomerStatus({ status, staffId }: ZodValidationGlobalStatus) {
        try {

            const isUserStatus = Boolean(status === "Active");

            const user = await db.query.users.findFirst({
                where: eq(users.id, staffId)
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found"
                });
            }

            await db.update(users).set({
                isActive: isUserStatus
            }).where(eq(users.id, staffId));

            return HandlerSuccess.success("Updated customer statuses successfully");

        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}