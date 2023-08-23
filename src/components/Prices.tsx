import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const menuPrices = ['Under $50', '$50 to $100', '$100 to $150', '$150 to $300', '$300 to $1000'];

const Prices: React.FC = () => {
    const [type, setType] = useState<string>('');
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
                    {menuPrices.map((prices, index) => (
                        <MenuItem key={index} value={prices}>
                            {prices}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Prices;
