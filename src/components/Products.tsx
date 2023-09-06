import { Bookmark } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { filterSelectedCategory } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById, getProducts, getProductsByCategory } from '../apis/products.api';

const Products: React.FC = () => {
    const selectedCategory = useSelector(filterSelectedCategory);
    console.log('Select', selectedCategory);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => {
            if (selectedCategory) {
                return getProductsByCategory(selectedCategory);
            } else {
                return getProducts();
            }
        },
        staleTime: 200 * 1000,
        keepPreviousData: true,
    });

    const handleProductHover = (productId: number) => {
        queryClient.prefetchQuery(['product', String(productId)], {
            queryFn: () => getProductById(productId),
            staleTime: 10 * 1000,
        });
    };

    console.log('array', data?.data);

    return (
        <Grid container spacing={2} padding="20px">
            {data?.data.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                    <Link
                        onMouseEnter={() => handleProductHover(product.id)}
                        to={`/product/${product.id}`}
                        className="cursor-pointer w-full flex flex-col items-center py-[10px] hover:transform hover:translate-y-[-5px] hover:shadow-lg hover:rounded-md transition duration-300"
                    >
                        <Box className="mx-2 w-[300px] lg:mb-0 mb-8">
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}
                            >
                                <img src={product.image} style={{ width: '200px', height: '180px' }} alt="" />
                            </Box>
                            <Box sx={{ backgroundColor: 'white' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        px: [4],
                                        py: [4],
                                    }}
                                >
                                    <Box>
                                        <Bookmark color="primary" />
                                    </Box>
                                    <Box bgcolor={'yellow'} py={1.5} px={2} borderRadius={'50px'}>
                                        <Typography variant="body2" color="textSecondary">
                                            Featured
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box p={2}>
                                    <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                                        <Typography variant="h6" color="textPrimary" className="line-clamp-1">
                                            {product.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" mt={2} className="line-clamp-3">
                                        {product.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', mt: [2] }}>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ bg: 'gray.200', py: 1 }}
                                            >
                                                {product.category}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box py={2}>
                                        <Typography variant="h5" color="primary">
                                            ${product.price}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Products;
