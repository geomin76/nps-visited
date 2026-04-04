import './App.css';
import { ParksList, TabPanel, a11yProps, countVisitedParks, saveVisited } from './Service';
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { NPList } from './NPList';
import { Tab, Tabs } from '@mui/material';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { NPPoster } from './NPPoster';
import { NPMap } from './NPMap';

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
  }),
);

let theme = createTheme();

theme.typography.h3 = {
  fontWeight: "300",
  '@media (min-width:700px)': {
    fontSize: '1.7rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.3rem',
  },
};

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState(ParksList);
  const [value, setValue] = useState(0);

  // Persist visited state to localStorage
  useEffect(() => {
    saveVisited(data);
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container className={classes.center}>
          <Grid sm={12} item className={classes.center}>
            <ThemeProvider theme={theme}>
              <Typography variant="h3">You've explored <span style={{ fontWeight: "400", fontSize: "2.5em" }}>{countVisitedParks(data)}</span>&nbsp; US National Parks!</Typography>
            </ThemeProvider>
          </Grid>
          <Grid sm={12} item className={classes.center}>
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<ChecklistOutlinedIcon />} {...a11yProps(0)} />
              <Tab icon={<InsertPhotoOutlinedIcon />} {...a11yProps(1)} />
              <Tab icon={<MapOutlinedIcon />} {...a11yProps(2)} />
            </Tabs>
          </Grid>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container className={classes.center}>
            <Grid sm={12} item className={classes.center}>
              <NPList data={data} setData={setData} />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>

      <TabPanel value={value} index={1}>
        <NPPoster data={data} setData={setData} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <NPMap data={data} setData={setData} />
      </TabPanel>
    </>
  );
}

export default App;
