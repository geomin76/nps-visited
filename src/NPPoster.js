import { Container, Grid, Stack, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ParksList, countVisitedParks } from './Service';

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
    const classes = useStyles();


    const setVisited = (index) => {
        setData(prev => {
            const newData = [...prev]
            const prevStatus = newData[index].visited
            newData[index].visited = !prevStatus;
            return newData;
        })
    }

    const rows = []
    // rows
    for (let i = 0; i < 7; i++) {
        // columns
        rows.push(data.slice(i, i + 9))
    }

    return (
        <>
            <Container maxWidth="xl" style={{paddingTop: "3%"}}>
                <div style={{backgroundColor: "burlywood"}}>
                    <div style={{ paddingTop: "7%", paddingBottom: "5%" }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2" className={classes.center}>US National Parks</Typography>
                        </ThemeProvider>
                        <Typography variant="p" className={classes.center}>{countVisitedParks(ParksList)} / {ParksList.length}</Typography>

                    </div>

                    {rows.map((elem) => {
                        return (
                            <Grid container>
                                {
                                    elem.map((innerElem) => {
                                        return (
                                            <Grid item xs>
                                                <div onClick={() => setVisited(innerElem['index'])}>
                                                    <img src="./np.png" width={"100%"} />
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                        )
                    })}
                </div>
            </Container>
        </>
    )
}