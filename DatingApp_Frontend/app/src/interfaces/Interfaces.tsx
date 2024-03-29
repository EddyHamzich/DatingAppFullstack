export interface IUserContext {
    userContext: {
        baseURL: string,
        jwt: string,
        jwtID: string,
        jwtUsername: string,
        jwtPhotoUrl: string,
        jwtExpiry: number,
        loggedIn: boolean,
        unreadMatches: number,
    }
    setUserContext: React.Dispatch<React.SetStateAction<IUserContext["userContext"]>>
}

export type UserContextState = IUserContext["userContext"]

export interface IMyJwt {
    nameid: string,
    unique_name: string,
    photo_url: string
    exp: number,
}

export interface IUser {
    id: number,
    username: string,
    age: number,
    introduction: string,
    photoUrl: string,
    gender: string
}

export interface IMessage {
    id: number,
    content: string,
    messageSent: string,
    senderID: number,
    senderUsername: string,
    senderPhotoUrl: string,
    recipientID: number,
    recipientUsername: string,
    recipientPhotoUrl: string,
    isRead: boolean
}

export interface IFormData {
    textarea: string,
    recipientID: number,
    senderID: number
}

export type AnyJSON = object | [] | string | number | boolean

export type HTTPVerb = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"