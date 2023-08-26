import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addNewProduct } from '../../slice/productSlice';

interface Product {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState<Product>({
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    });

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    const history = useNavigate();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(addNewProduct(formData));
            history('/dashboard/productlist');
        } catch (error) {
            console.log(error);
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
                                fontWeight: '500',
                            }}
                        >
                            Add
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
                                fontWeight: '500',
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

export default AddProduct;
