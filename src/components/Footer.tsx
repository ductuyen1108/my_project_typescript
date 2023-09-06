import { Grid, Typography, Container, Link, List, ListItem, Box, Divider, TextField, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#171613', color: '#ffffff' }}>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 5 }}>
                    <Box display="flex" flexDirection="column">
                        <Typography sx={{ fontSize: '25px', fontWeight: '400' }}>Subscribe Newsletter</Typography>
                        <Typography sx={{ fontSize: '16px', color: 'rgb(187, 185, 181)' }}>
                            Subscribe newsletter to get 5% on all products.
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        <TextField
                            label="Enter your email"
                            variant="outlined"
                            sx={{ backgroundColor: 'white', height: '56px', width: '390px', borderRadius: '4px' }}
                        />
                        <Button variant="contained" sx={{ backgroundColor: 'rgb(255, 32, 32)', height: '56px' }}>
                            Subscribe
                        </Button>
                    </Box>
                    <Box display="flex" gap={2}>
                        <FacebookIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
                        <InstagramIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
                        <YouTubeIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
                    </Box>
                </Box>
                <Divider sx={{ backgroundColor: '#444342' }} />
                <Grid container spacing={3} py={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <img src="https://i.imgur.com/UZ4IIYo.png" alt="" style={{ width: '150px', height: '120px' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={{ fontSize: '20px' }}>Shop Men</Typography>
                        <List>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Clothing Fashion
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Winter
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Summer
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Formal
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Cassual
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={{ fontSize: '20px' }}>Shop Women</Typography>
                        <List>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Clothing Fashion
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Winter
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Summer
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Formal
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Cassual
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={{ fontSize: '20px' }}>Shop Jewelery</Typography>
                        <List>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Gold Ring
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Silver Ring
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Plantinum Ring
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Formal
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" underline="hover" sx={{ color: 'rgb(187, 185, 181)', fontSize: '16px' }}>
                                    Cassual
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Divider sx={{ backgroundColor: '#444342' }} />
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography sx={{ py: 3 }} variant="inherit">
                        Copyright ©2023 All rights reserved | This template is made with by DT
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
