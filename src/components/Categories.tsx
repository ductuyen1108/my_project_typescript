import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { setCategory } from '../slice/filtersSlice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface CategoriesProps {
    handleCategoryClick: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ handleCategoryClick }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [type, setType] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                    {categories.map((category, index) => (
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
