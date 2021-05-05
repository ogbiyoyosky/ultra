import  { Schema } from "mongoose"

export const GameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: Number,
    publisher: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tags: {
        type: [String],
    },
    releaseDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})