import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProductById } from '../apis/products.api';

interface Props {
    productId: number;
    quantityProduct: number;
}

const PriceProduct: React.FC<Props> = ({ productId, quantityProduct }) => {
    const { data } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(productId),
    });

    const price = data?.data ? data?.data.price * quantityProduct : 0;
    return <Typography>$ {price}</Typography>;
};

export default PriceProduct;
