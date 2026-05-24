export interface User {
    id: string,
    name: string,
    avatarUrl: string,
    repos: number,
    location: string,
    createdAt: string,
    email?: string
};

export type SessionUser = Pick<User, 'id' | 'email'>

// export type UserChat = Pick<User, 'id' | 'name'>

export interface UserChat {
    id: string,
    user_name: string
}

export interface Mensaje {
    id: number,
    user_id: number,
    content: string,
    users? : UserChat,
    created_at: string
}

