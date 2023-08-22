import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../slice/cartSlice';
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { AddShoppingCart, Favorite, Star } from '@mui/icons-material';

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

function ProductDetail() {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{ id: string }>();
    console.log(id);

    const userToken = localStorage.getItem('userToken');
    const history = useNavigate();
    const dispatch = useDispatch();

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
        if (!userToken) {
            history('/login');
            return;
        }
        dispatch(
            addToCart({
                productId,
                quantity: 1,
            }),
        );
        history('/cart');
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
                            BRAND NAME
                        </Typography>
                        <Typography variant="h4" color="textPrimary" sx={{ mb: 1 }}>
                            {product.title}
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <Typography variant="body2" color="textPrimary" sx={{ mr: 1 }}>
                                {product.rating.rate}
                            </Typography>
                            <Star color="error" sx={{ fontSize: 18, verticalAlign: 'middle' }} />
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
}

export default ProductDetail;
