import './App.css';
import { parks } from './Parks';
import React, { useState } from 'react';
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

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState(parks);

  const countVisitedParks = () => {
    let visited = 0;
    for (var i = 0; i < parks.length; i++) {
      if (parks[i].visited === true) {
        visited++;
      }
    }
    return visited;
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <Grid container spacing={0} direction="column"
          alignItems="center"
          justifyContent="center">
          <Grid item lg={12} md={12} sm={12}>
            <div className={classes.center}>
              <NPList data={data} setData={setData} countVisitedParks={countVisitedParks} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
}

export default App;
