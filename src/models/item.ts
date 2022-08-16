import mongoose, { model, Schema } from "mongoose";

const baseSchema = new Schema({
    modName: String,
    modImages: [String], //[binary]
    modURL: String,
    modDescription: String,
    modId: String,
    Likes: [String], //[userId]
    downloadURL: String
});

export const Item = model(`mod`, baseSchema);

export interface ItemOptions {
    modName: string;
    modImages: string[];
    modURL: string;
    modDescription: string;
    modId: string;
    Likes: string[];
    downloadURL: string;
}