import { userReposiory } from "@/repositories/user-repository"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

async function createUser(email: string, password: string) {

    const existingUser = await userReposiory.findUserByEmail(email);
    if (existingUser) throw { message: "email already in use" };

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await userReposiory.createUser(email, hashedPassword)

    return user
}

async function getUser(email: string, password: string) {

    const user = await userReposiory.findUserByEmail(email);
    if (!user) throw { message: "user not found" };

    await checkIfPasswordsMatch(password, user.password);

    const userId = user.id
    const token = Jwt.sign({ userId }, process.env.JWT_SECRET)

    return {
        id: user.id,
        email: user.email,
        token
    }
}

async function checkIfPasswordsMatch(password: string, userPassword: string) {
    const matchingPassowords = await bcrypt.compare(password, userPassword);

    if (!matchingPassowords) throw { message: "passwords don't match" };
}


export const userService = {
    createUser,
    getUser
}