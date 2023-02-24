import joi from "joi"

export const networksSchema = joi.object({
    network: joi.string().required(),
    password: joi.string().required(),
    title: joi.string().required(),
})