import React from 'react';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import {
    AddProduct,
    Dashboard,
    Home,
    Login,
    ProductEdit,
    ProductList,
    Public,
    Shop,
    TodoList,
    User,
    Userlist,
} from './containers';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.TODO_LIST} element={<TodoList />} />
                    <Route path={path.SHOP} element={<Shop />} />
                    <Route path={path.USER} element={<User />} />
                </Route>
                <Route path={path.DASHBOARD} element={<Dashboard />}>
                    <Route path={path.PRODUCT_LIST} element={<ProductList />} />
                    <Route path={path.PRODUCT_EDIT} element={<ProductEdit />} />
                    <Route path={path.PRODUCT_ADD} element={<AddProduct />} />
                    <Route path={path.USER_LIST} element={<Userlist />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
