import app, { init } from "@/app";
import { cryptr } from "@/config/cryptr";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createCredentailFromUserId, createCredentialWithEncryptedPassword, createUser } from "../factories";
import clearDb, { createValidToken } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
    await init();
    clearDb();
})

describe("POST /credentials", () => {
    describe("error cases", () => {
        it("should respond with statuscode 401 if title already in use", async () => {
            const user = await createUser();
            const credential = await createCredentailFromUserId(user.id);
            const newCredential = {
                url: credential.url,
                username: credential.username,
                password: credential.password,
                title: credential.title
            }

            const token = await createValidToken(user.id)
            const { status } = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(newCredential)

            expect(status).toBe(httpStatus.CONFLICT)
        })
        it("should respond with statuscode 409 if no token", async () => {
            const { id } = await createUser();
            const credential = await createCredentailFromUserId(id);

            delete credential.id;

            const { status } = await server.post("/credentials").send(credential);
            expect(status).toBe(httpStatus.UNAUTHORIZED)
        })
    })
    it("should respond with statuscode 200 if ok", async () => {
        const user = await createUser();
        const credential = {
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            title: faker.lorem.word()
        }

        const token = await createValidToken(user.id)
        const { status } = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(credential)

        expect(status).toBe(httpStatus.OK)
    })
})

describe("GET /credentials", () => {
    it("should respond with statuscode 409 if no token", async () => {
        const { id } = await createUser();
        const credential = await createCredentailFromUserId(id);

        delete credential.id;

        const { status } = await server.get("/credentials").send(credential);
        expect(status).toBe(httpStatus.UNAUTHORIZED)
    })
    it("should respond with statucode 404 if user does not have credentials",async () => {
        const {id} = await createUser();
        const token = await createValidToken(id)
        const { status } = await server.get("/credentials").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statucode 404 if credential does not belong to user - CASE: 0",async () => {
        const {id} = await createUser();

        const token = await createValidToken(id)
        const { status } = await server.get("/credentials/0").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statucode 404 if credential does not belong to user - CASE: -1",async () => {
        const {id} = await createUser();

        const token = await createValidToken(id)
        const { status } = await server.get("/credentials/-1").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statuscode 200 and list of credentials if ok", async () => {
        const {id} = await createUser();
        const credential = await createCredentialWithEncryptedPassword(id)
        const token = await createValidToken(id)
        const { status } = await server.get("/credentials").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.OK)

    })
    it("should respond with statuscode 200 and credential of id if ok", async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);

        const credential = await createCredentialWithEncryptedPassword(user.id)

        const {status, body} = await server.get(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
        
        console.log(body)
        expect(status).toBe(httpStatus.OK)

    })
})
describe("DELETE /credentials", () =>{
    it("should respond with statuscode 409 if no token", async () => {
        const { id } = await createUser();

        const { status } = await server.delete("/credentials/1");
        expect(status).toBe(httpStatus.UNAUTHORIZED)
    })
    it("should respond with statucode 404 if no credential is found",async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);

        const { status } = await server.delete("/credentials/0").set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statuscode 201 if deleted",async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);
        const credential = await createCredentialWithEncryptedPassword(user.id)

        const { status } = await server.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.ACCEPTED)
    })
})