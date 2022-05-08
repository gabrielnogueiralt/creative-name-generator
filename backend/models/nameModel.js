import mongoose from "mongoose";
import random from 'mongoose-random';

const nameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    classification: {
        type: String,
        required: true,
    },
    frequency: {
        type: Number,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    vector: {
        type: [Number],
        required: true,
    }
})

const Name = mongoose.model("Name", nameSchema);
export default Name;