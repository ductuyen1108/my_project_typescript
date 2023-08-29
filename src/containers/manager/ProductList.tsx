import React from 'react';
import { useState, useEffect } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProduct, getAllProducts } from '../../apis/products.api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Products } from '../../types/products.type';

const ProductList: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [products, setProducts] = useState<Products>([]);

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    useEffect(() => {
        if (data?.data) {
            setProducts(data?.data);
        }
    }, [data]);

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (_, id) => {
            toast.success('Delete product successfully');
        },
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = (id: number) => {
        setOpen(true);
        setSelectedId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        deleteProductMutation.mutate(selectedId as number);
        const updateProductList = products.filter((product) => product.id !== selectedId);
        setProducts(updateProductList);
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: '3',
                    fontWeight: '600',
                    fontSize: '30px',
                }}
            >
                <Typography variant="h2">Product List</Typography>
            </Box>
            <ToastContainer />
            <Box
                sx={{
                    position: 'relative',
                    overflowX: ' auto',
                    boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
                    borderRadius: '0.5rem',
                    width: '1000px',
                    my: '30px',
                }}
            >
                <TableContainer component={Paper} sx={{ maxHeight: '405px', overflowY: 'auto' }}>
                    <Table>
                        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
                            <TableRow>
                                <TableCell>Product name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell sx={{ px: '55px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        ':hover': {
                                            backgroundColor: 'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {product.title}
                                    </TableCell>
                                    <TableCell>
                                        <img className="w-[20px] h-[20px]" src={product.image} alt="" />
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>$ {product.price}</TableCell>
                                    <TableCell>
                                        <NavLink to={`/dashboard/productedit/${product.id}`}>
                                            <Button variant="text" color="primary">
                                                <EditIcon />
                                            </Button>
                                        </NavLink>
                                        <Button
                                            className="show-dialog"
                                            variant="text"
                                            color="warning"
                                            onClick={() => product.id !== undefined && handleClickOpen(product.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                        <Dialog
                                            className="dialog"
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {'Do you really want to delete?'}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    When you click delete, you will permanently delete the product.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="button-group">
                                                <Button
                                                    className="delete"
                                                    onClick={handleConfirmDelete}
                                                    color="warning"
                                                >
                                                    Delete
                                                </Button>
                                                <Button onClick={handleClose} color="info" autoFocus>
                                                    Cancel
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '65px',
                    }}
                >
                    <NavLink to="/dashboard/productadd">
                        <Button sx={{ ml: [2] }} variant="contained" color="primary">
                            Add new product
                        </Button>
                    </NavLink>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={products.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default ProductList;
