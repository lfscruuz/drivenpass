import { faker } from "@faker-js/faker";
import { credentialsSchema } from "../../src/schemas/credential-schemas"


function generateValidInput() {
    return {
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        title: faker.lorem.word()
    }
}

describe("credentials schema validation", () =>{
    it("should respond with statuscode 400 if url not present",async () => {
        const input = generateValidInput();
        delete input.url

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if url format is invalid",async () => {
        const input = generateValidInput();
        input.url = faker.lorem.word();

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeDefined();
    })
    it("should respond with statuscode 400 if username not present",async () => {
        const input = generateValidInput();
        delete input.username

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if password not present",async () => {
        const input = generateValidInput();
        delete input.password

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if title not present",async () => {
        const input = generateValidInput();
        delete input.title

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with no error if format is valid",async () => {
        const input = generateValidInput();

        const {error} = credentialsSchema.validate(input);

        expect(error).toBeUndefined()
    })
})