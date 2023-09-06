import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { SlideShow, TabProducts } from '../../components';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box paddingBottom={3}>
                <SlideShow />
            </Box>
            <Box sx={{ width: '1300px', display: 'flex', justifyContent: 'space-between', pb: 5 }}>
                <Card sx={{ maxWidth: 400, maxHeight: 350 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            width="100"
                            height="100"
                            image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items1.jpg.webp"
                            alt="green iguana"
                            sx={{ position: 'relative' }}
                        />
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                backgroundColor: 'transparent',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: '500', textShadow: '2px 2px 4px rgba(0, 0, 0, 1.2)' }}
                            >
                                Men's Fashion
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 400, maxHeight: 350 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            width="100"
                            height="100"
                            image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items2.jpg.webp"
                            alt="green iguana"
                            sx={{ position: 'relative' }}
                        />
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                backgroundColor: 'transparent',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: '500', textShadow: '2px 2px 4px rgba(0, 0, 0, 1.2)' }}
                            >
                                Women's Fashion
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 400, maxHeight: 350 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            width="100"
                            height="100"
                            image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items3.jpg.webp"
                            alt="green iguana"
                            sx={{ position: 'relative' }}
                        />
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                backgroundColor: 'transparent',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: '500', textShadow: '2px 2px 4px rgba(0, 0, 0, 1.2)' }}
                            >
                                Kid's Fashion
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <Box
                sx={{
                    width: '1300px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pb: 5,
                    pt: 5,
                    backgroundColor: 'rgb(246, 246, 246)',
                    borderRadius: '5px',
                }}
            >
                <TabProducts />
            </Box>
            <Box sx={{ width: '1300px', display: 'flex', justifyContent: 'space-between', py: 7 }}>
                <Box
                    sx={{
                        width: '305px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LocalShippingOutlinedIcon sx={{ fontSize: '70px' }} />
                    <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Fast & Free Delivery</Typography>
                    <Typography>Free delivery on all orders</Typography>
                </Box>
                <Box
                    sx={{
                        width: '305px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PaymentOutlinedIcon sx={{ fontSize: '70px' }} />
                    <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Secure Payment</Typography>
                    <Typography>Free delivery on all orders</Typography>
                </Box>
                <Box
                    sx={{
                        width: '305px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CurrencyExchangeOutlinedIcon sx={{ fontSize: '70px' }} />
                    <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Money Back Guarantee</Typography>
                    <Typography>Free delivery on all orders</Typography>
                </Box>
                <Box
                    sx={{
                        width: '305px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SupportAgentIcon sx={{ fontSize: '70px' }} />
                    <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Online Support</Typography>
                    <Typography>Free delivery on all orders</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
