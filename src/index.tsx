import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    </Provider>,
);
