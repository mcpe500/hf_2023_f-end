import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

import landing_page_1 from '../../assets/img/landing_1.jpg'
import landing_page_round_1 from '../../assets/img/landing_page_round_1.jpg'

import { Button, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

import { styles } from '../../assets/font/font';
import { Link } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function LandingPage(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0.5}>
            <Grid item xs={6}>
                <Item>
                    <CardMedia
                        component="img"
                        image={landing_page_1}
                        sx={{
                            height: "90vh"
                        }}
                    />
                </Item>
            </Grid>
            
            <Grid item xs={6}>
                    <Item sx={{ height: "92vh", textAlign: "center" }}>
                        <Grid container sx={{marginTop: "35%", width: "75%", display: "flex", justifyContent: "center", alignItems: "center", justifyItems: "center"}}>
                            <Typography align="left" variant="h4" color="primary" sx={{ ...styles }}>
                                Jadikan inovasi dengan teknologi AI canggih dengan{" "}
                                <Box component="span" sx={{ color: yellow[600] }}>
                                Nama Aplikasi
                                </Box>
                            </Typography>
                        </Grid>
                        <Link to="/register" style={{textDecoration: "none"}}>
                            <Button sx={{marginTop: "5%"}} variant='contained' color='warning'>
                                Daftar sekarang
                            </Button>
                        </Link>
                    </Item>
            </Grid>
        </Grid>
        
        <Box
        position="absolute"
        bottom={0}
        width={300}
        height={300}
        right={0}
        borderRadius="50% 0 5% 5%"
        overflow="hidden"
        >
            <CardMedia
                component="img"
                image={landing_page_round_1}
                sx={{
                    height: "90vh"
                }}
            />
        </Box>
    </Box>
    )
}

export default LandingPage