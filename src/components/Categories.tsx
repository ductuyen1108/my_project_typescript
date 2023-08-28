import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { setCategory } from '../slice/filtersSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '../apis/products.api';

interface CategoriesProps {
    handleCategoryClick: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ handleCategoryClick }) => {
    const [type, setType] = useState<string>('');
    const dispatch = useDispatch();

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategory,
    });

    const handleChange = (e: SelectChangeEvent) => {
        setType(e.target.value);
    };

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, padding: '8px' }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={handleChange}
                    label="Category"
                >
                    {data?.data.map((category, index) => (
                        <MenuItem
                            key={index}
                            value={category}
                            onClick={() => {
                                handleCategoryClick(category);
                                dispatch(setCategory(category));
                            }}
                        >
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Categories;
