import { Request, Response } from "express";
import { Method, RouteConfig } from "../typings";

export const config: RouteConfig = {
    method: Method.Get,
    path: "/user/get"
}

export default function getUser(req: Request, res: Response) {
    //...
    return null;
}