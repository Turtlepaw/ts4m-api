import { Request, Response } from "express";
import { db } from "../db";
import { generateId } from "../Id";
import { Item, ItemOptions } from "../models/item";
import { GetItemResponse, Method, RouteConfig } from "../typings";

export const config: RouteConfig = {
    method: Method.Put,
    path: "/ItemResult/edit"
}

export default async function getItem(req: Request, res: Response) {
    await db.editItem(req.body);
    res.send({
        error: false,
        message: "ItemResult edited successfully"
    });
}