import { Request, Response } from "express";
import { Method, RouteConfig } from "../typings";

export const config: RouteConfig = {
    method: Method.Get,
    path: "/"
}

export default function Index(req: Request, res: Response) {
    res.send({
        error: false,
        message: "API Successfully Deployed"
    });
}