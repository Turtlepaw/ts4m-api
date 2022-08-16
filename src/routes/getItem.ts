import { Request, Response } from "express";
import { Item, ItemOptions } from "../models/item";
import { GetItemResponse, Method, RouteConfig } from "../typings";

const sampleItem: GetItemResponse = {
    modId: "test-mod",
    modName: "Test Mod",
    modImages: [Buffer.from("https://picsum.photos/id/1015/1000/600/")],
    modURL: "/mods/test-mod",
    modDescription: "*Ittalic* **Bold** Underline [Link](https://google.com) ~~strikethrough~~ ```code```",
    downloadURL: "https://simfileshare.net/download/2160320/",
    Likes: ["820465204411236362"]
}

export const config: RouteConfig = {
    method: Method.Get,
    path: "/item/get"
}

export default async function getItem(req: Request, res: Response) {
    const item = await Item.findOne({
        modId: req.params.modId
    }) as ItemOptions;

    const json: GetItemResponse = {
        modName: item.modName,
        modImages: item.modImages.map(image => Buffer.from(image)),
        modURL: item.modURL,
        modDescription: item.modDescription,
        modId: item.modId,
        Likes: item.Likes,
        downloadURL: item.downloadURL
    }

    res.send(json);
}