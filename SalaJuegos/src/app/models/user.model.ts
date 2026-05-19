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




