import React from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Fragment, useEffect, useState } from 'react';
import { ImageProduct, PriceProduct, ProductName, NameUser } from '../../components';
import { getUserLoggedIn } from '../../apis/users.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCartByUserId, updateCartItem } from '../../apis/carts.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from '../../types/carts.type';

const UserCart: React.FC = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [expandedCartId, setExpandedCartId] = useState<number | null>(null);
    const [quantityUpdated, setQuantityUpdated] = useState<number | null>(null);
    const [idProductEdit, setIdProductEdit] = useState<number | null>(null);
    const [idCartSelect, setIdCartSelect] = useState<number | null>(null);

    console.log(quantityUpdated);

    const loggedInfo = getUserLoggedIn();
    const userId = loggedInfo?.userId;

    const { data } = useQuery(['userData', userId], () => getCartByUserId(userId || 0));

    const updateCartItemMutation = useMutation({
        mutationFn: () => updateCartItem(idCartSelect, Number(userId), idProductEdit, quantityUpdated),
        onSuccess: () => {
            toast.success('Updated quantity successfully');
        },
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showUpdateBtn, setShowUpdateBtn] = useState<boolean>(false);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (data?.data) {
            setCarts(data?.data);
        }
    }, [data]);

    const toggleExpand = (cartId: number) => {
        setExpandedCartId((prev) => (prev === cartId ? null : cartId));
    };

    const handleQuantityChange = (cartIndex: number, productIndex: number, newQuantity: number) => {
        const updatedCarts = [...carts];
        updatedCarts[cartIndex].products[productIndex].quantity = newQuantity;
        setCarts(updatedCarts);
        setQuantityUpdated(newQuantity);
    };

    const handleUpdateCart = () => {
        updateCartItemMutation.mutate();
        setShowUpdateBtn(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                height: '100vh',
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: '20px',
                    width: '1150px',
                    height: '90vh',
                }}
            >
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
                                    <TableCell>Id</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Products</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carts.map((cart, cartIndex) => (
                                    <Fragment key={cart.id}>
                                        <TableRow
                                            key={cart.id}
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
                                        </TableRow>
                                        {expandedCartId === cart.id && (
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Product name</TableCell>
                                                                <TableCell>Image</TableCell>
                                                                <TableCell sx={{ paddingLeft: '42px' }}>
                                                                    Quantity
                                                                </TableCell>
                                                                <TableCell>Total</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cart.products.map((product, productIndex) => (
                                                                <TableRow key={product.productId}>
                                                                    <TableCell sx={{ width: '300px' }}>
                                                                        <ProductName productId={product.productId} />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <ImageProduct productId={product.productId} />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box display={'flex'} gap={3}>
                                                                            <RemoveIcon
                                                                                color="info"
                                                                                sx={{ cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    setIdProductEdit(product.productId);
                                                                                    setIdCartSelect(cart.id);
                                                                                    setShowUpdateBtn(true);
                                                                                    const newQuantity = Math.max(
                                                                                        0,
                                                                                        product.quantity - 1,
                                                                                    );
                                                                                    handleQuantityChange(
                                                                                        cartIndex,
                                                                                        productIndex,
                                                                                        newQuantity,
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <Typography width={'10px'}>
                                                                                {product.quantity}
                                                                            </Typography>
                                                                            <AddIcon
                                                                                color="info"
                                                                                sx={{ cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    setIdProductEdit(product.productId);
                                                                                    setIdCartSelect(cart.id);
                                                                                    setShowUpdateBtn(true);
                                                                                    const newQuantity =
                                                                                        product.quantity + 1;
                                                                                    handleQuantityChange(
                                                                                        cartIndex,
                                                                                        productIndex,
                                                                                        newQuantity,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <PriceProduct
                                                                            productId={product.productId}
                                                                            quantityProduct={product.quantity}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {showUpdateBtn &&
                                                                            idProductEdit === product.productId && (
                                                                                <Button
                                                                                    variant="text"
                                                                                    onClick={handleUpdateCart}
                                                                                >
                                                                                    Update
                                                                                </Button>
                                                                            )}
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
                        count={carts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default UserCart;
