import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import jwt_decode from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/selectors';
import { ImageProduct, PriceProduct, ProductName, NameUser } from '../../components';
import { CartItem, UpdatedCartItem, deleteCartItem, updateCart } from '../../slice/cartSlice';
import type { AppDispatch } from '../../redux/store';

interface Cart {
    id: number;
    userId: number;
    date: string;
    products: Array<{ productId: number; quantity: number }>;
}

export interface DecodeUser {
    sub: number;
    user: string;
}

const UserCart: React.FC = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [expandedCartId, setExpandedCartId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [quantityUpdated, setQuantityUpdated] = useState<number | null>(null);

    console.log(quantityUpdated);

    const userToken = useSelector(selectToken);

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

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
        let decodedUser: DecodeUser | undefined;
        if (userToken) {
            decodedUser = jwt_decode<DecodeUser>(userToken);
            const userId = decodedUser.sub;
            fetch(`https://fakestoreapi.com/carts/user/${userId}`)
                .then((res) => res.json())
                .then((data) => setCarts(data))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userToken]);

    const toggleExpand = (cartId: number) => {
        setExpandedCartId((prev) => (prev === cartId ? null : cartId));
    };

    const handleOpenDialog = (cartId: number) => {
        setOpenDialog(true);
        setSelectedId(cartId);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleQuantityChange = (cartIndex: number, productIndex: number, newQuantity: number) => {
        const updatedCarts = [...carts];
        updatedCarts[cartIndex].products[productIndex].quantity = newQuantity;
        setCarts(updatedCarts);
        setQuantityUpdated(newQuantity);
    };

    const handleUpdateCart = (productId: number, quantity: number, cartId: number, userId: number) => {
        const updatedCartItem: UpdatedCartItem = {
            cartId: cartId,
            userId: userId,
            date: new Date().toISOString(),
            products: {
                productId: productId,
                quantity: quantity,
            },
        };
        dispatch(updateCart(updatedCartItem));
        setShowUpdateBtn(false);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            const cartItemToDelete: CartItem = {
                cartId: selectedId,
            };

            dispatch(deleteCartItem(cartItemToDelete));
            setOpenDialog(false);
            setSelectedId(null);
            setQuantityUpdated(null);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: '20px', fontWeight: '600', fontSize: '25px' }}>
                <Typography variant="h2">Cart</Typography>
            </Box>
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
                                <TableCell sx={{ px: '25px' }}>Action</TableCell>
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
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                color="warning"
                                                onClick={() => handleOpenDialog(cart.id)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                            <Dialog
                                                open={openDialog}
                                                onClose={handleCloseDialog}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {'Do you really want to delete?'}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        When you click delete, you will permanently delete the cart.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button color="warning" onClick={handleConfirmDelete}>
                                                        Delete
                                                    </Button>
                                                    <Button color="info" autoFocus onClick={handleCloseDialog}>
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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
                                                            <TableCell sx={{ paddingLeft: '42px' }}>Quantity</TableCell>
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
                                                                    {showUpdateBtn && (
                                                                        <Button
                                                                            variant="text"
                                                                            onClick={() => {
                                                                                const productId = product.productId;
                                                                                const quantity = product.quantity;
                                                                                const cartId = cart.id;
                                                                                const userId = cart.userId;
                                                                                handleUpdateCart(
                                                                                    productId,
                                                                                    quantity,
                                                                                    cartId,
                                                                                    userId,
                                                                                );
                                                                            }}
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
        </Box>
    );
};

export default UserCart;
