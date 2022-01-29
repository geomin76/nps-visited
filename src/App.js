import './App.css';
import { parks } from './Parks';
import React, { useState  } from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NPList } from './NPList';
import { ParkPoster } from './ParkPoster';
import domtoimage from 'dom-to-image';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
  }),
);

/**
 * TODO:
 * figure out CSS for poster, to make sure it is stagnant for mobile + web (design the poster) and fix scaling
 * pretty up buttons and list and zoom component
 * fix download image to allow for mobile
 */

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

  const handleDownloadImage = async () => {
    domtoimage.toJpeg(document.getElementById('poster'), { quality: 1 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'nps-poster.jpg';
        link.href = dataUrl;
        link.click();
    });
  }

  return (
    <Container maxWidth="lg">
      <TransformWrapper 
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <div id="poster">
              <ParkPoster data={data} setData={setData} />
            </div>
          </TransformComponent>
        </React.Fragment>
        
      )}
      </TransformWrapper>

        <br/>
        <Box>
          <Grid container>
            <Grid item lg={12} md={12} sm={12}>
              <div className={classes.center}>
                <NPList data={data} setData={setData}/>
              </div>
              <div className={classes.center}>
                <p>{countVisitedParks()}/{parks.length}</p>
              </div>
            </Grid>
          </Grid>
        </Box>

        <button type="button" onClick={handleDownloadImage}>
          Download as Image
        </button>
  


    </Container> 
      
  );
}

export default App;
