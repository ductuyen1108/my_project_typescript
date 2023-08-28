import { Product, ProductItem, Products } from '../types/products.type';
import http from '../utils/http';

export const getAllProducts = () => {
    return http.get<Products>('products');
};

export const getProducts = () => {
    return http.get<ProductItem[]>('products');
};

export const getProductsByCategory = (category: string) => {
    return http.get<ProductItem[]>(`products/category/${category}`);
};

export const getLimitProducts = (limit: number | string) => {
    http.get<Products>('products', {
        params: {
            _limit: limit,
        },
    });
};

export const getProductById = (id: number | string) => {
    return http.get<ProductItem>(`products/${id}`);
};

export const getAllCategory = () => {
    return http.get<[]>('products/categories');
};

export const addProduct = (product: Omit<ProductItem, 'id' | 'rating'>) => http.post<ProductItem>('/products', product);

export const updateProduct = (id: number | string, product: Product) => http.put<Product>(`products/${id}`, product);

export const deleteProduct = (id: number | string) => http.delete<{}>(`products/${id}`);
