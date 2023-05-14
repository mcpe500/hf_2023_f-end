import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { items } from './itemsData';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

// search bar
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

let banners = items;
export function OverviewContent(kePrompt) {
    return (
      <Grid item xs = {9}>
        <center>
        <Autocomplete
          freeSolo
          id="SearchBar"
          disableClearable
          options={top5Courses.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),            
              }}
              placeholder='Search Here'
            />
          )}
          sx={{marginBottom: '20px',  background: 'white'}}
        />
        </center>
        <Grid container justifyContent={"center"} spacing={2}>
          {banners.map((item, index) => (
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  sx={{ minHeight: '250px' }}
                  image={item.pathImage}
                  title="Learning Something"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.judul}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.deskripsi}
                  </Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained" size="small" onClick={() => kePrompt(item.index)}>
                  <b>Add as Topic</b>
                </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  }

  const top5Courses= [
    { title: 'Programming'},
    { title: 'Science'},
    { title: 'Mathematics'}
  ];