import { Container, Grid, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ParksList, countVisitedParks, setVisited } from './Service';
import { useEffect, useState } from 'react';

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
// let theme = createTheme();
// theme.typography.h3 = {
//     fontSize: "5vw"
// }

export const NPPoster = ({ data, setData }) => {

    const [temp, setTemp] = useState(data);

    useEffect(() => {
        setTemp(data)
    }, [data])

    const classes = useStyles();

    return (
        <>
            <div style={{ paddingTop: "3%", paddingLeft: "3%", paddingRight: "3%" }}>
                <div style={{ backgroundColor: "#3e4c4d", paddingBottom: "4%", paddingRight: "3%", paddingLeft: "2%" }}>
                    <div style={{ paddingTop: "7%", paddingBottom: "5%" }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3" style={{ color: "white" }} className={classes.center}>US NATIONAL PARKS</Typography>
                            <Typography variant="p" className={classes.center} style={{ color: "white" }}>{countVisitedParks(ParksList)} / 63</Typography>

                        </ThemeProvider>

                    </div>
                    {
                        temp.map((value) => {
                            return (
                                <Grid container>
                                    {
                                        value.map((innerVal) => {
                                            return (
                                                <Grid item xs key={innerVal.index} onClick={() => setVisited(innerVal.index, setData)} >
                                                    <img src="./np.png" width={"110%"} style={{ filter: innerVal.visited ? 'grayscale(0%)' : 'grayscale(100%)' }} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}