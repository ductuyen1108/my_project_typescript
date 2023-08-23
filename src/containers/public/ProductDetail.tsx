import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Rating, Typography } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import type { AppDispatch } from '../../redux/store';
import { selectToken } from '../../redux/selectors';
import { UpdatedCartItem, addToCart } from '../../slice/cartSlice';
import { DecodeUser } from '../system/UserCart';
import jwt_decode from 'jwt-decode';

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    rating: {
        rate: number;
    };
    price: number;
}

const ProductDetail: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{ id: any }>();

    const userToken = useSelector(selectToken);
    const history = useNavigate();
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data: Product) => {
                setProduct(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleAddToCart = (productId: number) => {
        if (userToken) {
            const decodedUser = jwt_decode<DecodeUser>(userToken);
            const newCartItem: UpdatedCartItem = {
                cartId: id,
                userId: decodedUser.sub,
                date: new Date().toISOString(),
                products: {
                    productId: productId,
                    quantity: 1,
                },
            };
            dispatch(addToCart(newCartItem));
            history('/dashboard/cartlist');
        } else {
            history('/login');
        }
    };

    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <CircularProgress />;
            </Box>
        );
    }

    return (
        <Box className="text-gray-700 body-font overflow-hidden bg-white">
            <Grid container spacing={4} className="p-20">
                <Grid item md={6}>
                    <Box
                        sx={{
                            border: '1px solid gray.200',
                            width: '700px',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                        }}
                    >
                        <img alt="ecommerce" src={product.image} style={{ width: '300px', height: '400px' }} />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box sx={{ pl: 2 }}>
                        <Typography variant="overline" color="textSecondary" sx={{ textTransform: 'uppercase', mb: 1 }}>
                            NAME
                        </Typography>
                        <Typography variant="h4" color="textPrimary" sx={{ mb: 1 }}>
                            {product.title}
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <Typography variant="body2" color="textPrimary" sx={{ mr: 1 }}>
                                <Rating name="size-small" value={product.rating.rate} precision={0.1} size="small" />
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="textPrimary" sx={{ textTransform: 'capitalize', mb: 2 }}>
                            {product.category}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" sx={{ mb: 4 }}>
                            {product.description}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '2px solid #E2E8F0',
                                pb: 2,
                                mb: 2,
                            }}
                        ></Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography variant="h4" color="textPrimary" sx={{ mr: 'auto' }}>
                                ${product.price}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ ml: 2 }}
                                onClick={() => handleAddToCart(product.id)}
                                startIcon={<AddShoppingCart />}
                            >
                                Add to Cart
                            </Button>
                            <IconButton sx={{ ml: 2 }} aria-label="Add to favorites">
                                <Avatar>
                                    <Favorite />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
