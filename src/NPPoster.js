import { Container, Grid, Stack } from '@mui/material';


export const NPPoster = ({ data, setData }) => {

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
            <Container maxWidth="xl">
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
            </Container>
        </>
    )
}