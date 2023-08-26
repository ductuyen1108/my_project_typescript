import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../slice/productSlice';
import type { AppDispatch } from '../../redux/store';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

const ProductEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useNavigate();

    const [formData, setFormData] = useState<Product>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    });

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data: Product) => {
                setFormData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    console.log(useEffect);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(
                updateProduct({
                    id: formData.id,
                    title: formData.title,
                    price: formData.price,
                    description: formData.description,
                    image: formData.image,
                    category: formData.category,
                }),
            );

            history('/dashboard/productlist');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Paper
                sx={{
                    width: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h2" sx={{ py: [3], textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
                    Product Edit
                </Typography>
                <form onSubmit={handleSubmit} className="w-[900px]">
                    <TextField
                        label="Title"
                        name="title"
                        id="fullWidth"
                        value={formData.title}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Description"
                        id="fullWidth"
                        fullWidth
                        name="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Image"
                        name="image"
                        value={formData.image}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <Box sx={{ display: 'flex', gap: 8, pb: [3] }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '100px',
                                height: '40px',
                                fontSize: '15px',
                                fontWeight: '600',
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={() => history('/dashboard/productlist')}
                            sx={{
                                width: '100px',
                                height: '40px',
                                fontSize: '15px',
                                fontWeight: '600',
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default ProductEdit;
