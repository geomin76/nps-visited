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

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const NPPoster = ({ data, setData }) => {

    const [temp, setTemp] = useState(data);

    useEffect(() => {
        setTemp(data)
    }, [data])

    const classes = useStyles();

    return (
        <>
            <Container style={{ paddingTop: "3%" }}>
                <div style={{ backgroundColor: "burlywood", paddingBottom: "4%", paddingRight: "3%", paddingLeft: "3%" }}>
                    <div style={{ paddingTop: "7%", paddingBottom: "5%" }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3" className={classes.center}>US National Parks</Typography>
                        </ThemeProvider>
                        <Typography variant="p" className={classes.center}>{countVisitedParks(ParksList)} / 63</Typography>
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
            </Container>
        </>
    )
}