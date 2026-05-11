import { zodValidationSignUp } from "@/server/packages/validations";
import db from "../config/db";
import { courtOwners, userCredentials, users } from "../db";
import { Helper } from "../utils";
import { ErrorHandler } from "@/server/packages/utils";
import { Context as HonoContext } from "hono";
import { getUserAgent } from "../server/trpc/context";

export const generateUser = async (c: HonoContext) => {
    try {
        const email = "msBadminton@gmail.com";

        const userAgent = getUserAgent(c) || '';

        if (!userAgent) {
            console.log("User agent is missing in the request.");
            return;
        }

        const userInfo = await db.query.users.findFirst({
            where: (users, { eq, and }) => and(
                eq(users.email, email),
                eq(users.isActive, true),
            ),
        });

        if (userInfo) {
            console.log("User already exists.");
            return;
        }

        const password = "msBadminton09@&.com";

        const hashedPassword = await Helper.bcryptHash(password);

        const validationUserInfo = zodValidationSignUp.parse({
            email,
            password,
            confirmPassword: password,
            fullName: "MS Badminton",
            phoneNumber: "2012345678",
        });

        if (!validationUserInfo) {
            const message = ErrorHandler.getErrorMessage(validationUserInfo);
            console.error("Validation failed for user info:", message);
            return;
        }

        await db.transaction((async (tx) => {

            const [newUser] = await tx.insert(users).values({
                fullName: validationUserInfo.fullName,
                email: validationUserInfo.email,
                phoneNumber: validationUserInfo.phoneNumber,
                role: "Owner",
                userAgent: userAgent,
            }).returning({
                id: users.id,
            });

            const newUserId = newUser?.id || null;

            if (!newUserId) {
                console.error("Failed to create user.");
                return;
            }

            await tx.insert(userCredentials).values({
                userId: newUserId,
                passwordHash: hashedPassword,
            });

            await tx.insert(courtOwners).values({
                userId: newUserId,
                companyName: "MS Badminton",
                address: "123 Main Street, City, Country",
            });

            console.log("User generated successfully.");

        }));

        // You can also add logic here to generate an access token for the new user if needed
        // const token = await Helper.generateToken({ userId: newUserId, role: "owner" });
        // console.log("Generated token for new user:", token);

        // logic to auto signup users
    } catch (error) {
        console.log("Error occurred while generating user:", error);
    }
}