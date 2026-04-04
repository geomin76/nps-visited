import { Button, Container, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { countVisitedParks, setVisited } from './Service';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

const useStyles = makeStyles((theme) =>
    createStyles({
        center: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
        },
    }),
);

let theme = createTheme({
    typography: {
        h3: {
            fontSize: "5vw",
            fontFamily: "PT Sans Caption, sans-serif"
        },
        p: {
            fontSize: "1.8vw",
            fontFamily: "PT Sans, sans-serif;"
        }
    }
})

const downloadFunction = () => {
    htmlToImage.toPng(document.getElementById('poster'))
        .then(function (dataUrl) {
            download(dataUrl, 'poster.png');
        });
}

// Chunk flat array into rows of 9 for poster grid
const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const NPPoster = ({ data, setData }) => {
    const classes = useStyles();
    const rows = chunkArray(data, 9);

    return (
        <>
            <Container>
                <br/>
                <div className={classes.center}>
                    <Button variant="outlined" onClick={() => downloadFunction()}>Download your poster</Button>
                </div>
            </Container>
            <div id="poster" style={{ paddingTop: "3%", paddingLeft: "3%", paddingRight: "3%" }}>
                <div style={{ backgroundColor: "#3e4c4d", paddingBottom: "4%", paddingRight: "3%", paddingLeft: "2%" }}>
                    <div style={{ paddingTop: "7%", paddingBottom: "5%" }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3" style={{ color: "white" }} className={classes.center}>US NATIONAL PARKS</Typography>
                            <Typography variant="p" className={classes.center} style={{ color: "white" }}>{countVisitedParks(data)} / 63</Typography>
                        </ThemeProvider>
                    </div>
                    {
                        rows.map((row, rowIndex) => (
                            <Grid container key={rowIndex}>
                                {
                                    row.map((park) => (
                                        <Grid item xs key={park.index} onClick={() => setVisited(park.index, setData)}>
                                            <div style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                <img src="./np.png" alt="np.png" width={"110%"} style={{ filter: park.visited ? 'grayscale(0%)' : 'grayscale(100%)' }} />
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        ))
                    }
                </div>
            </div>
        </>
    )
}