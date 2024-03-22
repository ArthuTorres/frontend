import { BaseModel } from "@gimmeapps/gquicklib-angular";
import { User } from "./auth.models";

export interface Cliente extends BaseModel {
    user_id: number
    user: Partial<User>
}