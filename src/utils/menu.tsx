import React from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Inventory2Icon from '@mui/icons-material/Inventory2';

interface MenuSetting {
    text: string;
    path: string;
}

interface MenuDashboard extends MenuSetting {
    icon: React.ReactElement;
}

export const menuHeader: MenuSetting[] = [
    {
        text: 'Todo List',
        path: 'todolist',
    },
    {
        text: 'Shop',
        path: 'shop',
    },
    {
        text: 'Cart',
        path: 'cart',
    },
];

export const settings: MenuSetting[] = [
    {
        text: 'Profile',
        path: 'user,',
    },
    {
        text: 'Dashboard',
        path: 'dashboard',
    },
];

export const menuDashboard: MenuDashboard[] = [
    {
        text: 'Products',
        icon: <Inventory2Icon />,
        path: 'productlist',
    },
    {
        text: 'Users',
        icon: <ManageAccountsIcon />,
        path: 'userlist',
    },
    {
        text: 'Carts',
        icon: <ProductionQuantityLimitsIcon />,
        path: 'cartlist',
    },
];
