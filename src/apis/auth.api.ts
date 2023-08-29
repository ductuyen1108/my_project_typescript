import http from '../utils/http';

export const login = async (username: string, password: string) => {
    try {
        const response = await http.post('/auth/login', {
            username,
            password,
        });
        return response.data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
