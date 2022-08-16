import mongoose, { model, Schema } from "mongoose";

const baseSchema = new Schema({
    access_token: String,
    token_type: String,
    jwt_token: String
});

export const User = model(`user`, baseSchema);;

export interface UserOptions {
    access_token?: string;
    token_type?: string;
    jwt_token?: string;
}