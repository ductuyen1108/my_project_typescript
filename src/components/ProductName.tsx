import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProductById } from '../apis/products.api';

interface Props {
    productId: number;
}

const ProductName: React.FC<Props> = ({ productId }) => {
    const { data } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(productId),
    });

    return (
        <Typography sx={{ overflow: 'hidden', width: '300px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {data?.data.title}
        </Typography>
    );
};

export default ProductName;
