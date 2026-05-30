import db from "@/server/config/db";
import { customers, users } from "@/server/db";
import { ZodValidationFilter } from "@/server/packages/validations";
import { HandlerSuccess, tRPCErrorServices } from "@/server/utils";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

export class tRPCManageCustomerQueries {

    // Get customer info
    public static selectCustomerInfo = {
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        membershipType: customers.membershipType,
        dateOfBirth: customers.dateOfBirth,
        address: customers.address,
    }
    /**
     * Get paginated list of customer members
     */
    public static async list(input: ZodValidationFilter) {
        try {
            const { limit, page } = input;
            const offset = (page - 1) * limit;

            // Get customer with their user info (join with customers table)
            const customerList = await db
                .select({ ...this.selectCustomerInfo })
                .from(users)
                .innerJoin(customers, eq(users.id, customers.userId)) // Important: only real customer
                .where(eq(users.isActive, true))
                .orderBy(desc(users.createdAt))
                .limit(limit)
                .offset(offset);

            // Count total customer
            const [{ total }] = await db
                .select({ total: count() })
                .from(users)
                .innerJoin(customers, eq(users.id, customers.userId))
                .where(eq(users.isActive, true));

            const totalPage = Math.ceil(total / limit);

            return HandlerSuccess.success("Customer list retrieved successfully", {
                data: customerList,
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

    /**
     * Get single customer by user ID
     */
    public static async getOne(userId: string) {
        try {
            const [customer] = await db
                .select({ ...this.selectCustomerInfo })
                .from(users)
                .innerJoin(customers, eq(users.id, customers.userId))
                .where(and(
                    eq(users.id, userId),
                    eq(users.isActive, true))
                )
                .limit(1);

            if (!customer) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Customer member not found",
                });
            }

            return HandlerSuccess.success("Customer retrieved successfully", customer);
        } catch (error) {
            throw tRPCErrorServices.tRPCError(error);
        }
    }
}