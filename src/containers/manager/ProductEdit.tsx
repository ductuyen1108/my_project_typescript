import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((json) => console.log(json));

        history('/productlist');
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
