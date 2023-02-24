import { faker } from "@faker-js/faker";
import { networksSchema } from "../../src/schemas/networks-schemas"



function generateValidInput() {
    return {
        network: faker.internet.userName(),
        password: faker.internet.password(),
        title: faker.lorem.word()
    }
}

describe("credentials schema validation", () =>{
    it("should respond with statuscode 400 if network not present",async () => {
        const input = generateValidInput();
        delete input.network

        const {error} = networksSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if password not present",async () => {
        const input = generateValidInput();
        delete input.password

        const {error} = networksSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if title not present",async () => {
        const input = generateValidInput();
        delete input.title

        const {error} = networksSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with no error if format is valid",async () => {
        const input = generateValidInput();

        const {error} = networksSchema.validate(input);

        expect(error).toBeUndefined()
    })
})