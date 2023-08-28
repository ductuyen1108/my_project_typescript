export interface ProductItem {
    id: number;
    title: string | null;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

export type Products = Pick<ProductItem, 'id' | 'title' | 'image' | 'category' | 'price'>[];
export type Product = Pick<ProductItem, 'title' | 'price' | 'description' | 'image' | 'category'>;
