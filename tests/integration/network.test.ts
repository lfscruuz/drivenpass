import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createNetworkFromUserId, createNetworkWithEncryptedPassword, createUser } from "../factories";
import clearDb, { createValidToken } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
    await init();
    clearDb();
})

describe("POST /networks", () => {  
    describe("error cases", () => {
        it("should respond with statuscode 401 if title already in use", async () => {
            const user = await createUser();
            const network = await createNetworkFromUserId(user.id);
            const newNetwork = {
                network: network.network,
                password: network.password,
                title: network.title
            }

            const token = await createValidToken(user.id)
            const {status} = await server.post("/networks").set("Authorization", `Bearer ${token}`).send(newNetwork)
            
            expect(status).toBe(httpStatus.CONFLICT)
        })
        it("should respond with statuscode 409 if no token",async () => {
            const {id} = await createUser();
            const network = await createNetworkFromUserId(id);
            delete network.id;
            
            const {status} = await server.post("/networks").send(network);
            expect(status).toBe(httpStatus.UNAUTHORIZED)
        })
        it("should respond with statuscode 200 if ok",async () => {
            const user = await createUser();
            const network = {
                network: faker.internet.userName(),
                password: faker.internet.password(),
                title: faker.lorem.word()
            }

            const token = await createValidToken(user.id)
            const {status} = await server.post("/networks").set("Authorization", `Bearer ${token}`).send(network)
            
            expect(status).toBe(httpStatus.OK)
        })
    })
})
describe("GET /networks", () => {
    it("should respond with statuscode 409 if no token", async () => {
        const { id } = await createUser();
        const network = await createNetworkFromUserId(id);

        delete network.id;

        const { status } = await server.get("/networks").send(network);
        expect(status).toBe(httpStatus.UNAUTHORIZED)
    })
    it("should respond with statucode 404 if user does not have networks",async () => {
        const {id} = await createUser();
        const token = await createValidToken(id)
        const { status } = await server.get("/networks").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statucode 404 if network does not belong to user - CASE: 0",async () => {
        const {id} = await createUser();

        const token = await createValidToken(id)
        const { status } = await server.get("/networks/0").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statucode 404 if network does not belong to user - CASE: -1",async () => {
        const {id} = await createUser();

        const token = await createValidToken(id)
        const { status } = await server.get("/networks/-1").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statuscode 200 and list of networks if ok", async () => {
        const {id} = await createUser();
        const network = await createNetworkWithEncryptedPassword(id)
        const token = await createValidToken(id)
        const { status } = await server.get("/networks").set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.OK)

    })
    it("should respond with statuscode 200 and network of id if ok", async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);

        const network = await createNetworkWithEncryptedPassword(user.id)

        const {status, body} = await server.get(`/networks/${network.id}`).set("Authorization", `Bearer ${token}`);
        
        console.log(body)
        expect(status).toBe(httpStatus.OK)

    })
})
describe("DELETE /networks", () =>{
    it("should respond with statuscode 409 if no token", async () => {
        const { id } = await createUser();

        const { status } = await server.delete("/networks/1");
        expect(status).toBe(httpStatus.UNAUTHORIZED)
    })
    it("should respond with statucode 404 if no network is found",async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);

        const { status } = await server.delete("/networks/0").set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.NOT_FOUND)
    })
    it("should respond with statuscode 201 if deleted",async () => {
        const user = await createUser();
        const token = await createValidToken(user.id);
        const network = await createNetworkWithEncryptedPassword(user.id)

        const { status } = await server.delete(`/networks/${network.id}`).set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.ACCEPTED)
    })
})