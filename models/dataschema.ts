import mongoose, { Schema } from "mongoose";

const databaseSchema = new Schema(
    {
        userId: String,
        title: String,
        type: String,
        prompt: String,
        answer: String,
    },
    {
        timestamps: true,
    }
);

const dataSchema = mongoose.models.dataSchema || mongoose.model("dataSchema", databaseSchema);

export default dataSchema;