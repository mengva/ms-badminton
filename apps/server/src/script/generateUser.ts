import { zodValidationSignUp } from "@/server/packages/validations";
import db from "../config/db";
import { userCredentials, users } from "../db";
import { Helper } from "../utils";
import { ErrorHandler } from "@/server/packages/utils";

export const generateUser = async () => {
    try {
        const email = "msBadminton@gmail.com";

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
                role: "owner",
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

            console.log("User generated successfully.");

        }));

        // You can also add logic here to generate an access token for the new user if needed
        // const token = await Helper.generateToken({ userId: newUserId, role: "owner" });
        // console.log("Generated token for new user:", token);

        // logic to auto signup users
    } catch (error) {
        console.error("Error occurred while generating user:", error);
    }
}