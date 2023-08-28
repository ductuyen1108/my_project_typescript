import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProductById } from '../apis/products.api';

interface Props {
    productId: number;
}

const ImageProduct: React.FC<Props> = ({ productId }) => {
    const { data } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(productId),
    });

    return <img src={data?.data.image} alt="" style={{ width: '35px', height: '40px' }} />;
};

export default ImageProduct;
