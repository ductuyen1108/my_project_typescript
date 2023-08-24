/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Shop from '../containers/public/Shop';

describe('Shop', () => {
    it('should render correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Shop />
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should toggle categories visibility when clicking the Category button', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Shop />
            </Provider>,
        );
        const categoryButton = getByText('Category');
        fireEvent.click(categoryButton);
        const categoriesList = getByText('Electronics');
        expect(categoriesList).toBeInTheDocument();
    });

    it('should update currentLimit when clicking the Load more button', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Shop />
            </Provider>,
        );
        const loadMoreButton = getByText('Load more');
        fireEvent.click(loadMoreButton);
    });
});
