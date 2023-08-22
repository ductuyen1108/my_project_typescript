import React from 'react';
import { useEffect, useState } from 'react';

interface Props {
    productId: number;
}

interface Product {
    image: string;
}

const ImageProduct: React.FC<Props> = ({ productId }) => {
    const [product, setproduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((data: Product) => {
                setproduct(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [productId]);
    return <img src={product?.image} alt="" style={{ width: '35px', height: '40px' }} />;
};

export default ImageProduct;
