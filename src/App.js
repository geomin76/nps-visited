import './App.css';
import { parks } from './Parks';
import React, { useState } from 'react';
import { Container, Box, Grid, ListSubheader } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NPList } from './NPList';
import { Map } from './Map';

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    map: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      position: 'sticky',
      top: 0
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
    <>
      <ListSubheader>
        <div className={classes.center} style={{ backgroundColor: "white" }}>
          <p style={{ fontWeight: "700", fontSize: "1.2em" }}>You've explored <span style={{ fontWeight: "400", fontSize: "3em" }}>{countVisitedParks()}</span>&nbsp; National Parks!</p>
        </div>
      </ListSubheader>
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <div className={classes.map}>
              <Map />
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12} >
            <div className={classes.center}>
              <NPList data={data} setData={setData} countVisitedParks={countVisitedParks} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>


  );
}

export default App;
