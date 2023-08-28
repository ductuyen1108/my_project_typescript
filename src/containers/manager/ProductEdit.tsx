import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById, updateProduct } from '../../apis/products.api';
import { FormStateType, initialFormState } from './AddProduct';
import { Product } from '../../types/products.type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductEdit: React.FC = () => {
    const [formState, setFormState] = useState<FormStateType>(initialFormState);

    const { id } = useParams<{ id: string }>();
    const history = useNavigate();
    const queryClient = useQueryClient();

    const updateProductMutation = useMutation({
        mutationFn: (_) => updateProduct(id as string, formState as Product),
        onSuccess: (data) => {
            queryClient.setQueryData(['product', id], data);
        },
    });

    const productQuery = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(Number(id)),
        enabled: id !== undefined,
        staleTime: 1000 * 10,
    });

    useEffect(() => {
        if (productQuery.data) {
            setFormState(productQuery.data.data);
        }
    }, [productQuery.data]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        updateProductMutation.mutate(undefined, {
            onSuccess: (_) => {
                toast.success('Updated successfully');
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
                <ToastContainer />
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
