import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Categories, Products } from '../../components';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../slice/filtersSlice';

const Shop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    const toggleCategories = () => {
        setIsVisible(!isVisible);
        if (isVisible) {
            dispatch(setCategory(null));
        }
    };

    const handleCategoryClick = (category: string) => {
        dispatch(setCategory(category));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', gap: [8], py: '35px' }}>
                <Box width={'75%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Products />
                </Box>
                <Box sx={{ width: '25%' }}>
                    <Typography sx={{ fontSize: '30px' }}>Filter by:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <ListItemText primary="Category" onClick={toggleCategories} />
                            </ListItem>
                            {isVisible && <Categories handleCategoryClick={handleCategoryClick} />}
                            {!isVisible && (
                                <>
                                    <Divider />
                                    <ListItem button divider>
                                        <ListItemText primary="Price" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Rating" />
                                    </ListItem>
                                    <Divider light />
                                </>
                            )}
                        </List>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Shop;
