import * as React from 'react';
import env from "./env.js";
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { OverviewContent } from './overviewContent';
import { PromptPage } from './promptPage';
// card import

// container import
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// grid-display
import Grid from '@mui/material/Grid'; // Grid version 1

// sidebar
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CodeIcon from '@mui/icons-material/Code';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function StudentDashboard() {
    const [topicIndex, setTopicIndex] = useState(-1);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [data, setData] = useState({
        username: '',
        nama: '',
    });
    const handleListItemClick = (event, index) => {
        if(index === 5) {
            localStorage.clear()
            window.location.href = "/"
        }
        setSelectedIndex(index);
    }
    axios.get(env.server+'dashboard')
    .then(function (response){
        setData({username: localStorage.getItem("nama"), nama: response.data.nama,});
    }).catch(function (error){
        console.log(error);
    })

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl" style={{padding : '20px'}}>
            <Grid container spacing={2} sx={{position: 'absolute', top: '10%'}}>
                <Grid item xs={2}>
                {/* sidebar */}
                <Box sx={{position: 'fixed'}}>
                    <List>
                    <ListItem key={data.username} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText  style={{fontWeight:'bold'}} primary={data.username}/>
                        </ListItemButton>
                    </ListItem>
                    {['Overview', 'Prompt', 'History', 'Upgrade Account'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
                            <ListItemIcon>
                            {index === 0 ? <InsertChartIcon/> : (index === 1 ? <CodeIcon/> : (index === 2 ? <HistoryIcon/> : <UpgradeIcon/>))}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['Profile & Account', 'Log Out'].map((text, index) =>  {
                            return (
                                <ListItem key={text} disablePadding>
                                <ListItemButton selected={selectedIndex === index+4} onClick={(event) => handleListItemClick(event, index+4)}>
                                    <ListItemIcon>
                                    {index % 2 === 0 ? <AccountBoxIcon/> : <ExitToAppIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                                </ListItem>
                            )
                        }  
                    )}
                    </List>
                </Box>
                {/* sidebar */}
                </Grid>

                
                {/* Content Banner */}
                
                    {selectedIndex === 0 ? OverviewContent((index) => {
                    setTopicIndex(index)
                    setSelectedIndex(1);
                    }) : PromptPage(topicIndex)}
                
                {/* Content Banner */}
                
            </Grid>

        </Container>
    </React.Fragment>
    );
}


export default StudentDashboard;
