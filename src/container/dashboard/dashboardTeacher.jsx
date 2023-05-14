import * as React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import teacherImage from '../../assets/img/teacher_dashboard.jpg'

const dashboardMenu = ["Home", "Confirm prompt", "History"]
const dashboardIcon = [<HomeIcon />, <CheckCircleIcon />, <DescriptionIcon />]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

class TeacherDashboard extends React.PureComponent {
    state = {
        selectedIndex: 0,
        data: {
            nama: ""
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                ...this.state,
                data: {
                    ...this.state.data,
                    nama: localStorage.getItem("nama")
                }
            }
        })
    }

    render() {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={4} md={2}>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            {dashboardMenu.map((e, i) => {
                                return (
                                    <ListItemButton
                                        selected={this.state.selectedIndex === i}
                                        onClick={() => this.setState(() => {
                                            return {
                                                selectedIndex: i,
                                            }
                                        })}
                                    >
                                        <ListItemIcon>
                                            {dashboardIcon[i]}
                                        </ListItemIcon>
                                        <ListItemText primary={e} />
                                    </ListItemButton>
                                )
                            })}
                        </List>
                    </Box>
                    </Grid>
                    <Grid item xs={8} md={10}>
                        <Item>
                            {
                                this.state.selectedIndex === 0
                                ? (
                                    <>
                                        <Typography sx={{
                                            fontWeight: 'bolder'
                                        }}
                                        color="black">
                                            Welcome, to teacher dashboard {this.state.data.nama} !
                                        </Typography>
                                        <CardMedia
                                            component="img"
                                            image={teacherImage}
                                            sx={{
                                                height: "80vh"
                                            }}
                                        />
                                    </>
                                )
                                : this.state.selectedIndex === 1
                                    ? (
                                        <>
                                            <Typography sx={{
                                                fontWeight: 'bolder'
                                            }}
                                            color="black">
                                                Welcome, to teacher dashboard {this.state.data.nama} !
                                            </Typography>
                                            <CardMedia
                                                component="img"
                                                image={teacherImage}
                                                sx={{
                                                    height: "80vh"
                                                }}
                                            />
                                        </>
                                    )
                                    : <></>
                            }
                        </Item>
                    </Grid>
                </Grid> 
            </>
        )
    }
}

export default TeacherDashboard;