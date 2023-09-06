import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MensSliceShow from './MensSlideShow';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabProducts() {
    const [value, setValue] = React.useState(0);
    const [selectedCategory, setSelectedCategory] = React.useState<string>("men's clothing");

    const categories = ["men's clothing", "women's clothing", 'electronics', 'jewelery'];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleTabClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" fontWeight={500}>
                    Trending This Week
                </Typography>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {categories.map((category, index) => (
                        <Tab
                            label={category}
                            {...a11yProps(index)}
                            key={category}
                            onClick={() => handleTabClick(category)}
                        />
                    ))}
                </Tabs>
            </Box>
            {categories.map((category, index) => (
                <CustomTabPanel value={value} index={index} key={category}>
                    <MensSliceShow selectedCategory={selectedCategory} />
                </CustomTabPanel>
            ))}
        </Box>
    );
}
