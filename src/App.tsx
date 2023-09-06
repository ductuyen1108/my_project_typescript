import React from 'react';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import {
    AddProduct,
    CartList,
    Dashboard,
    Home,
    Login,
    ProductDetail,
    ProductEdit,
    ProductList,
    Public,
    Shop,
    Signup,
    TodoList,
    User,
    UserCart,
    Userlist,
} from './containers';
import { CircularProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

function App() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    return (
        <div className="App">
            {isFetching + isMutating > 0 && <CircularProgress sx={{ position: 'fixed' }} />}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.SIGUP} element={<Signup />} />
                    <Route path={path.TODO_LIST} element={<TodoList />} />
                    <Route path={path.SHOP} element={<Shop />} />
                    <Route path={path.USER} element={<User />} />
                    <Route path={path.USER_CART} element={<UserCart />} />
                    <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
                </Route>
                <Route path={path.DASHBOARD} element={<Dashboard />}>
                    <Route path={path.PRODUCT_LIST} element={<ProductList />} />
                    <Route path={path.PRODUCT_EDIT} element={<ProductEdit />} />
                    <Route path={path.PRODUCT_ADD} element={<AddProduct />} />
                    <Route path={path.USER_LIST} element={<Userlist />} />
                    <Route path={path.CART_LIST} element={<CartList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
