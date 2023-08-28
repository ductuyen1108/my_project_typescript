import jwtDecode from 'jwt-decode';
import { User, UserInfo, Users } from '../types/users.type';
import http from '../utils/http';
import { DecodeToken } from '../types/auth.type';

export const getAllUsers = () => {
    return http.get<User[]>('users');
};

export const getUserById = (id: number) => {
    return http.get<UserInfo>(`users/${id}`);
};

export const getUserLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const decodedToken: DecodeToken = jwtDecode(token);
    const userId = decodedToken.sub;
    const username = decodedToken.user;

    return { userId, username };
};
