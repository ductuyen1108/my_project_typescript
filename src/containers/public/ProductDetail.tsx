import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Rating, Typography } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductById } from '../../apis/products.api';
import { getUserLoggedIn } from '../../apis/users.api';
import { addToCart } from '../../apis/carts.api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useNavigate();

    const loggedInfo = getUserLoggedIn();
    const userId = loggedInfo?.userId;

    const productQuery = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(Number(id)),
        enabled: id !== undefined,
        staleTime: 1000 * 10,
    });

    const product = productQuery.data?.data;

    const addToCartMutation = useMutation({
        mutationFn: () => addToCart(Number(userId), Number(id), 1),
        onSuccess: () => {
            toast.success('Add to cart successfully');
        },
    });

    const handleAddToCart = () => {
        if (userId) {
            addToCartMutation.mutate();
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
            <ToastContainer />
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
                                onClick={handleAddToCart}
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
