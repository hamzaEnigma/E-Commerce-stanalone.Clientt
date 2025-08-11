import { User } from "./user.model";

export interface AuthResponse {
    token:string,
    result:boolean,
    user:User
}