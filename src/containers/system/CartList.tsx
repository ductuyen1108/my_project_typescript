import React, { Fragment, useEffect, useState } from 'react';
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

interface Cart {
    id: number;
    userId: number;
    date: string;
    products: [
        {
            productId: number;
            quantity: number;
        },
    ];
}

const CartList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expandedCartId, setExpandedCartId] = useState<number | null>(null);

    const [carts, setCarts] = useState<Cart[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/carts')
            .then((res) => res.json())
            .then((data: Cart[]) => {
                setCarts(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

export default CartList;