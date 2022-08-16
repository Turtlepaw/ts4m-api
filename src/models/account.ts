import mongoose, { model, Schema } from "mongoose";

const baseSchema = new Schema({
    userId: String,
    name: String,
    avatarURL: String
});

export const Account = model(`user`, baseSchema);;

export interface AccountOptions {
    userId: string;
    name: string;
    avatarURL: string;
}