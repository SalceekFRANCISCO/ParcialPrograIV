import { UserChat } from "./userChat"

export interface Mensaje {
    id: number,
    user_id: number,
    content: string,
    users? : UserChat,
    created_at: string
}

