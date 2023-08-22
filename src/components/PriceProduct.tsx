import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface Props {
    productId: number;
    quantityProduct: number;
}

interface Product {
    price: number;
}

const PriceProduct: React.FC<Props> = ({ productId, quantityProduct }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((data: Product) => {
                setProduct(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [productId]);

    const price = product ? product.price * quantityProduct : 0;
    return <Typography>$ {price}</Typography>;
};

export default PriceProduct;
