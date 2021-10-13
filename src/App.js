import './App.css';
import { parks } from './Parks';
import React, { useState  } from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NPList } from './NPList';
import { ParkPoster } from './ParkPoster';
import html2canvas from "html2canvas";

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

  const printRef = React.useRef();


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
    const element = printRef.current
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 4
    });
 
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
 
    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';
 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  

  return (
    <div ref={printRef}>
      <Container maxWidth="lg">
        <ParkPoster data={data} setData={setData} />
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
    </div>
      
  );
}

export default App;
