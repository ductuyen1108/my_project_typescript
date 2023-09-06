import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getProductsByCategory } from '../apis/products.api';
import { ProductItem } from '../types/products.type';

interface Props {
    selectedCategory: string;
}

const MensSliceShow = ({ selectedCategory }: Props) => {
    const productsByCategory = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => getProductsByCategory(selectedCategory),
    });

    const products = productsByCategory.data?.data;
    const isLoading = productsByCategory.isLoading;

    const productGroups: Array<Array<ProductItem>> = products
        ? products.reduce((acc, item, index) => {
              const groupIndex = Math.floor(index / 4);
              if (!acc[groupIndex]) {
                  acc[groupIndex] = [];
              }
              acc[groupIndex].push(item);
              return acc;
          }, [] as Array<Array<ProductItem>>)
        : [];
    return (
        <Box>
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            ) : (
                <Carousel autoPlay interval={2500} infiniteLoop={true} showStatus={false} showThumbs={false}>
                    {productGroups.map((group, groupIndex) => (
                        <div key={groupIndex} style={{ display: 'flex', gap: 20 }}>
                            {group.map((product) => (
                                <Card key={product.id} sx={{ width: 340 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            sx={{ width: '125px', height: '150px', objectFit: 'contain' }}
                                            alt="Product"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    maxHeight: '80px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    ))}
                </Carousel>
            )}
        </Box>
    );
};

export default MensSliceShow;
