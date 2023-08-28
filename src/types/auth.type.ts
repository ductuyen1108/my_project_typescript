export interface Auth {
    username: string;
    password: string;
}

export interface DecodeToken {
    iat: number;
    sub: number;
    user: string;
}
