import './App.css';
import { parks } from './Parks';
import { useState } from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NPList } from './NPList';

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
  }),
);

function App() {
  const classes = useStyles();

  const [data, setData] = useState(parks);
  
  // add map, (react-simple-maps)
  // add fake images, with potential for logos

  // clean up

  //center items

  return (
    <Container>
      <Box>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} p={5}>
            <div className={classes.center}>
              <NPList data={data} setData={setData}/>
            </div>
          </Grid>
        </Grid>

      </Box>

    </Container>   
  );
}

export default App;
