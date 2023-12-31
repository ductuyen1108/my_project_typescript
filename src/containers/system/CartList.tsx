import React, { Fragment, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ImageProduct, NameUser, PriceProduct, ProductName } from '../../components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCartItem, getAllCarts } from '../../apis/carts.api';
import { ToastContainer, toast } from 'react-toastify';
import { Cart } from '../../types/carts.type';

const CartList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expandedCartId, setExpandedCartId] = useState<number | null>(null);
    const [cartList, setCartList] = useState<Cart[]>([]);

    const { data } = useQuery({
        queryKey: ['carts'],
        queryFn: getAllCarts,
    });

    useEffect(() => {
        if (data?.data) {
            setCartList(data?.data);
        }
    }, [data]);

    const deleteCartMutation = useMutation({
        mutationFn: (id: number) => deleteCartItem(id),
        onSuccess: (_) => {
            toast.success('Delete cart successfully');
        },
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const toggleExpand = (cartId: number) => {
        setExpandedCartId((prev) => (prev === cartId ? null : cartId));
    };

    const handleDelete = async (id: number) => {
        deleteCartMutation.mutate(id);
        const updatedCartList = cartList.filter((cart) => cart.id !== id);
        setCartList(updatedCartList);
    };

    console.log('data: ', data?.data);
    console.log('data cart show', cartList);
    console.log(
        'userId',
        cartList.map((cart) => cart.userId),
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: '20px', fontWeight: '600', fontSize: '25px' }}>
                <Typography variant="h2">Cart</Typography>
            </Box>
            <ToastContainer />
            <Box
                sx={{
                    position: 'relative',
                    overFlowX: 'auto',
                    boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
                    borderRadius: '0.5rem',
                    width: '1000px',
                    height: '245px',
                    mb: '30px',
                }}
            >
                <TableContainer component={Paper} sx={{ maxHeight: '440px', overFlowY: 'auto' }}>
                    <Table>
                        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Products</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartList.map((cart) => (
                                <Fragment key={cart.id}>
                                    <TableRow
                                        sx={{
                                            ':hover': {
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                            },
                                        }}
                                    >
                                        <TableCell>{cart.id}</TableCell>
                                        <TableCell>
                                            <NameUser userId={cart.userId} />
                                        </TableCell>
                                        <TableCell>{cart.date}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => toggleExpand(cart.id)}>
                                                {expandedCartId === cart.id ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                    <KeyboardArrowDownIcon />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" onClick={() => handleDelete(cart.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedCartId === cart.id && (
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Product name</TableCell>
                                                            <TableCell>Image</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>Total</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {cart.products.map((product) => (
                                                            <TableRow key={product.productId}>
                                                                <TableCell sx={{ width: '300px' }}>
                                                                    <ProductName productId={product.productId} />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <ImageProduct productId={product.productId} />
                                                                </TableCell>
                                                                <TableCell>{product.quantity}</TableCell>
                                                                <TableCell>
                                                                    <PriceProduct
                                                                        productId={product.productId}
                                                                        quantityProduct={product.quantity}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={cartList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
};

export default CartList;
