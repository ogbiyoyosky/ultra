import  { Schema } from "mongoose"

export const PublisherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    siret: Number,
    phone: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})