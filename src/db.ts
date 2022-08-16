import { connect } from "mongoose";
import { generateId } from "./Id";
import { Account, AccountOptions } from "./models/account";
import { Item, ItemOptions } from "./models/item";

function getURI() {
    const URI = process.env.MONGODB_URI;

    if (URI == null) {
        throw Error("MONGODB_URI is not defined");
    } else {
        return URI;
    }
}

//Connect to mongoDB
connect(
    getURI(), {
    //@ts-expect-error
    useNewUrlParser: true,
    useUnifiedTopology: true
});

interface dbItemModel {
    modName: string | null;
    modImages: Buffer[] | null;
    modURL: string | null;
    modDescription: string | null;
    modId: string | null;
    Likes: string[] | null;
    downloadURL: string | null;
}

interface dbResult<data> {
    data: data;
    error: boolean;
    message: string;
}

async function createItem(data: ItemOptions): Promise<dbResult<{
    Id: string;
    item: dbItemModel;
}>> {
    const Id = generateId();
    const item = await Item.create({
        modName: data?.modName || "Unknown Mod",
        modImages: data?.modImages || [],
        modURL: data?.modURL || "https://example.com/",
        modDescription: data?.modDescription || "This mod has no description",
        modId: Id,
        Likes: [],
        downloadURL: data?.downloadURL || "https://example.com/download/" + Id
    });

    return {
        data: {
            Id,
            //@ts-expect-error
            item
        },
        error: false,
        message: "Item created successfully"
    }
}

interface EditItemOptions extends ItemOptions {
    newLike?: string;
    removeLike?: string;
}

async function editItem(data: EditItemOptions): Promise<dbResult<dbItemModel | null>> {
    const ItemResult = await Item.findOne({
        modId: data?.modId
    });

    if (ItemResult == null) {
        return {
            error: true,
            message: "Item not found",
            data: null
        };
    }

    if (data?.modName) ItemResult.modName = data?.modName;
    if (data?.modImages) {
        if (data?.modImages.includes("old")) {
            ItemResult.modImages = [...ItemResult.modImages, ...data?.modImages];
        } else ItemResult.modImages = data?.modImages;
    };
    if (data?.modURL) ItemResult.modURL = data?.modURL;
    if (data?.modDescription) ItemResult.modDescription = data?.modDescription;
    if (data?.downloadURL) ItemResult.downloadURL = data?.downloadURL;
    if (data?.newLike) ItemResult.Likes = [...ItemResult.Likes, data?.newLike];
    if (data?.removeLike) ItemResult.Likes = ItemResult.Likes.filter(like => like !== data?.removeLike);

    return {
        //@ts-expect-error
        data: ItemResult.save(),
        error: false,
        message: "Item edited successfully"
    };
}

async function getUser() {

}

async function getAccount(data: string): Promise<dbResult<AccountOptions>> {
    const account = await Account.findOne({
        userId: data
    });

    return {
        //@ts-expect-error
        data: account,
        error: false,
        message: "Account found successfully"
    }
}

async function createAccount(data: AccountOptions): Promise<dbResult<AccountOptions>> {
    const account = await Account.create({
        userId: data.userId,
        name: data?.name || "Unknown User",
        avatarURL: data?.avatarURL || "https://cdn.discordapp.com/embed/avatars/1.png"
    });

    return {
        //@ts-expect-error
        data: account,
        error: false,
        message: "Account created successfully"
    }
}

async function getUserData(data: string) {
    //data is a user Id
    //the website will store a cookie or smth with their user id
    //then it will fetch the user data from db for that user id

}

export const db = {
    createItem,
    editItem,
}