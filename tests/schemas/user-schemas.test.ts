import { faker } from "@faker-js/faker";
import { signUpSchema } from "../../src/schemas/user-schemas";


function generateValidInput(){
    return {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    }
}

describe("signIn schema validation",() =>{
    it("should respond with statuscode 400 if email not present",async () => {
        const input = generateValidInput();
        delete input.email

        const {error} = signUpSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if email format is invalid",async () => {
        const input = generateValidInput();
        input.email = faker.lorem.word();

        const {error} = signUpSchema.validate(input);

        expect(error).toBeDefined();
    })
    it("should respond with statuscode 400 if password is not present",async () => {
        const input = generateValidInput();
        delete input.password

        const {error} = signUpSchema.validate(input);

        expect(error).toBeDefined()
    })
    it("should respond with statuscode 400 if password format is invalid",async () => {
        const input = generateValidInput();
        input.password = faker.internet.password(5);

        const {error} = signUpSchema.validate(input);

        expect(error).toBeDefined();
    })
    it("should respond with no error if format is valid",async () => {
        const input = generateValidInput();

        const {error} = signUpSchema.validate(input);

        expect(error).toBeUndefined()
    })
})