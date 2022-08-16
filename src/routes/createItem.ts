import { Request, Response } from "express";
import { db } from "../db";
import { generateId } from "../Id";
import { Item, ItemOptions } from "../models/item";
import { GetItemResponse, Method, RouteConfig } from "../typings";

export const config: RouteConfig = {
    method: Method.Post,
    path: "/item/create"
}

export default async function getItem(req: Request, res: Response) {
    const item = await db.createItem(req.body)
    res.send({
        modId: item.data.Id,
        error: false,
        message: "Item created successfully"
    });
}