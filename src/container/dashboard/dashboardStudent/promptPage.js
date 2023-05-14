import * as React from 'react';
import { Grid } from "@mui/material"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import { items } from './itemsData';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import env from './env.js'; 


let historyChat = [{}];

export function PromptPage(index) {

  return (
    <Grid item xs={9}>
      <Grid container justifyContent={"center"} spacing={2}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xxl" sx={{ color: 'black' }}>
            <Box sx={{ bgcolor: '#c9dbf2', height: '90vh', borderRadius: '20px', padding: '2.5%', position: 'relative' }}>
              <center>
                {index === -1 ? <h3>Pililah topic terlebih dahulu untuk jawaban yang lebih baik</h3> : <h1 style={{ fontWeight: 'bold' }}> {items[index].judul}</h1>}
              </center>
              {/* content */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div style={{
                    width: '100%',
                    height: '620px',
                    background: '#edf5ff',
                    borderRadius: '20px',
                    marginBottom: '10px',
                    padding: '40px',
                    boxSizing: 'border-box',
                    overflowY: 'scroll'
                  }}>
                    {historyChat.map((text) => (
                      text.role === "student" ? 
                      <div className='chatBanner bgblue'>{text.res}</div> : <div className='chatBanner bggreen'>{text.res}</div>
                    ))
                    }
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Outlined primary" color="primary" focused style={{ width: '100%' }} onKeyDown={async (event) => {
                    if (event.key === 'Enter') {
                      historyChat.push({res:event.target.value ,role:"student"})
                      let result;
                      // console.log(env.server)
                      // alert(env.server + "chat-bot")
                      await axios.post(env.server + "chat-bot", { prompt: event.target.value })
                        .then((resp) => {
                          result = resp.data  
                          console.log(result)
                          historyChat.push({res:result.response ,role:"ai"});
                          console.log(historyChat)
                        }).catch((error) => {
                          console.error(error);
                        })

                    }

                    // let tempArray = HistoryChat;
                    // tempArray.push(event.target.value);
                    // setHistoryChat(HistoryChat.push(event.target.value));
                  }} />
                </Grid>
              </Grid>
              {/* content */}
            </Box>
          </Container>
        </React.Fragment>
      </Grid>
    </Grid>
  )
}