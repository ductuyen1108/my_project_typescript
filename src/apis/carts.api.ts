import { Cart } from '../types/carts.type';
import http from '../utils/http';

export const getAllCarts = () => {
    return http.get<Cart[]>('carts');
};

export const getCartByUserId = (userId: number) => {
    return http.get<Cart[]>(`carts/user/${userId}`);
};

export const deleteCartItem = (id: number) => {
    return http.delete<{}>(`carts/${id}`);
};

export const updateCartItem = (
    id: number | null,
    userId: number | null,
    productId: number | null,
    quantity: number | null,
) => {
    return http.put<{}>(`carts/${id}`, {
        userId: userId,
        date: new Date().toISOString(),
        products: [
            {
                productId: productId,
                quantity: quantity,
            },
        ],
    });
};

export const addToCart = (userId: number, productId: number, quantity: number) => {
    return http.post<{}>('carts', {
        userId: userId,
        date: new Date().toISOString(),
        products: [
            {
                productId: productId,
                quantity: quantity,
            },
        ],
    });
};
