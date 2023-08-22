import React from 'react';
import {
    Box,
    CircularProgress,
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
import { useEffect, useState } from 'react';

interface User {
    id: number;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    };
    phone: string;
    address: {
        street: string;
        city: string;
    };
}

const Userlist: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/users')
            .then((res) => res.json())
            .then((data: User[]) => setUsers(data))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {users ? (
                <>
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
                        <Typography variant="h2">User List</Typography>
                    </Box>
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Street</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                        <TableRow
                                            key={user.id}
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
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {user.name.firstname} {user.name.lastname}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                                {user.address.street}
                                            </TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                                {user.address.city}
                                            </TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Paper>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
};

export default Userlist;
