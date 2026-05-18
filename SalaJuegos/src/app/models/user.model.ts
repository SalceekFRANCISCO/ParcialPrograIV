export interface User {
    id: string,
    name: string,
    avatarUrl: string,
    repos: number,
    location: string,
    createAt: Date,
    isActive: boolean,
    email?: string
};

export type SessionUser = Pick<User, 'id' | 'email'>




