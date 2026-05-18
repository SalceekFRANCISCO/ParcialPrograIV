export interface User {
    id: string,
    name: string,
    avatarUrl: string,
    repos: number,
    location: string,
    // createdAt: Date,
    createdAt: string,
    isActive: boolean,
    email?: string
};

export type SessionUser = Pick<User, 'id' | 'email'>




