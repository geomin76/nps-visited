import './App.css';
import { ParksList, TabPanel, a11yProps, countVisitedParks } from './Service';
import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { NPList } from './NPList';
import { Tab, Tabs } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { NPMap } from './NPMap';
import { NPPoster } from './NPPoster';

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

let theme = createTheme();

theme.typography.h3 = {
  fontWeight: "300",
  '@media (min-width:700px)': {
    fontSize: '1.7rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
};

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState(ParksList);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container className={classes.center}>
          <Grid sm={12} className={classes.center}>
            <ThemeProvider theme={theme}>
              <Typography variant="h3">You've explored <span style={{ fontWeight: "400", fontSize: "3em" }}>{countVisitedParks(ParksList)}</span>&nbsp; US National Parks!</Typography>
            </ThemeProvider>
          </Grid>
          <Grid sm={12} className={classes.center}>
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<ChecklistOutlinedIcon />} {...a11yProps(0)} />
              <Tab icon={<MapOutlinedIcon />} {...a11yProps(1)} />
              <Tab icon={<InsertPhotoOutlinedIcon />} {...a11yProps(2)} />
            </Tabs>
          </Grid>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container className={classes.center}>
            <Grid sm={12} className={classes.center}>
              <NPList data={data} setData={setData} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container className={classes.center}>
            <Grid sm={12} className={classes.center}>
              <NPMap data={data} setData={setData} />
            </Grid>
          </Grid>

          {/* <p>
            Instead of a full US-map, divide into sections and then allow user to select and click on each subregion, then pick national parks
          </p>
          <p>
            Follow this: https://www.freecodecamp.org/news/how-to-make-clickable-svg-map-html-css/
            <br/>
            and create clickable modal for each region: https://mui.com/material-ui/react-modal/
            <br/>
            then inside the modal, user can click national parks for each region and marks theme
            <br/>
            zoom function? maybe???
            <br/>
             have some kind of black dot, then if clicked, a tree or pin or something fun
          </p>
          <p>
            Create regions based on this:
            <br/>
            https://morethanjustparks.com/wp-content/uploads/2021/10/national-parks-map-corrected2.jpg
            <br/>
            https://www.nps.gov/aboutus/images/NPS-Unified-Regions-Map.jpg?maxwidth=1300&maxheight=1300&autorotate=false
            <br/>
            https://www.researchgate.net/profile/Vincent-Santucci/publication/328761204/figure/fig3/AS:689936000888835@1541504969307/Map-showing-the-seven-regions-of-the-US-National-Park-Service.ppm
          </p> */}

        </TabPanel>
        <TabPanel value={value} index={2}>
              <NPPoster data={data} setData={setData}/>
          {/* <img src="./npposter.jpg" width={"100%"}/> */}
        </TabPanel>
      </Container>
    </>
  );
}

export default App;
