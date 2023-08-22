import { Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
    productId: number;
}

interface Product {
    title: string;
}

const ProductName: React.FC<Props> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((data: Product) => [setProduct(data)])
            .catch((error) => {
                console.log(error);
            });
    }, [productId]);
    return <Typography>{product?.title}</Typography>;
};

export default ProductName;
