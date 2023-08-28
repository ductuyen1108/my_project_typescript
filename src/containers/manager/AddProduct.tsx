import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '../../apis/products.api';
import { ProductItem } from '../../types/products.type';

export type FormStateType = Omit<ProductItem, 'id' | 'rating'>;
export const initialFormState: FormStateType = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
};

const AddProduct: React.FC = () => {
    const [formState, setFormState] = useState<FormStateType>(initialFormState);

    const { mutate } = useMutation({
        mutationFn: (body: FormStateType) => {
            return addProduct(body);
        },
    });

    const history = useNavigate();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formState, {
            onSuccess: () => {
                setFormState(initialFormState);
                history('/dashboard/productlist');
            },
        });
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
                        value={formState.title}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Description"
                        id="fullWidth"
                        fullWidth
                        name="description"
                        value={formState.description}
                        onChange={handleOnChange}
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={formState.category}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={formState.price}
                        onChange={handleOnChange}
                        fullWidth
                        sx={{ mb: [6] }}
                    />
                    <TextField
                        label="Image"
                        name="image"
                        value={formState.image}
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
