const path = {
    PUBLIC: '/',
    HOME: '',
    TODO_LIST: 'todolist',
    USER: 'user',
    SHOP: 'shop',
    LOGIN: 'login',
    PRODUCT_DETAIL: 'product/:id',
    PRODUCT_LIST: 'productlist',
    PRODUCT_EDIT: 'productedit/:id',
    PRODUCT_ADD: 'productadd',
    CART_LIST: 'cartlist',
    CART_EDIT: 'cartedit/:id',
    CART_ADD: 'cartadd',
    CART_USER: 'cart',
    USER_LIST: 'userlist',
    DASHBOARD: 'dashboard',
    STAR: '*',
} as const;

export default path;
