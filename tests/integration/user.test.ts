import app, { init } from "@/app";
import supertest from "supertest";
import clearDb from "../helpers";
import { createUser, createUserWithData } from "../factories";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import bcrypt from "bcrypt";


const server = supertest(app);

beforeAll(async () => {
    await init()
    clearDb()
})

afterEach(async () => {
    clearDb()
})

describe("POST /user", () => {
    describe("signup", () => {
        it("should respond with statucode 409 if user already exists",async () => {
            const createdUser = await createUser();
            
            const newUser = {
                email: createdUser.email,
                password: createdUser.password
            }

            const {status} = await server.post("/users/signup").send(newUser);
            expect(status).toBe(httpStatus.CONFLICT);
        })
        it("should respond with statuscode 201 if CREATED", async () => {
            const user = {
                email: faker.internet.email(),
                password: faker.internet.password()
            }

            const { status } = await server.post("/users/signup").send(user);
            expect(status).toBe(httpStatus.CREATED)
        })
    })
    describe("login", () => {
        it("should respond with statuscode 404 if user NOT_FOUND",async () => {
            const user = await createUser();
            user.email = faker.internet.email();

            const {status} = await server.post("/users/login").send(user);
            expect(status).toBe(httpStatus.NOT_FOUND)
        })
        it("should respond with statuscode 200 and token if OK", async () => {
            const user = {
                email: faker.internet.email(),
                password: faker.internet.password()
            }

            const hashedPassword = await bcrypt.hash(user.password, 12);
            
            const newUser = await createUserWithData(user.email, hashedPassword)

            const {status, body} = await server.post("/users/login").send(user)
            
            expect(status).toBe(httpStatus.OK)
            expect(body).toEqual({
                id: newUser.id,
                email: user.email,
                token: expect.any(String)
            })
        })
    })

})