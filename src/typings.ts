export interface GetUserResponse {
    access_token: string;
    token_type: string;
    jwt_token: string;
    username: string;
    avatarURL: string;
    userId: string;
}

//export interface 

export interface GetItemResponse {
    modName: string;
    modImages: Buffer[];
    modURL: string;
    modDescription: string;
    modId: string;
    Likes: string[];
    downloadURL: string;
}

export enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}

export enum Scope {
    Identify = "identify",
    Email = "email",
    Guilds = "guilds",
    GuildsJoin = "guilds.join",
}

export interface RouteConfig {
    path: string;
    method: Method | Method[];
}