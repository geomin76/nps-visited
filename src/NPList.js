import { List, ListItem, ListItemIcon, ListItemText, Box, ListSubheader, ListItemButton } from '@mui/material';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
  }),
);

export const NPList = ({ data, setData, countVisitedParks }) => {
  const classes = useStyles();

  const setVisited = (index) => {
    setData(prev => {
      const newData = [...prev]
      const prevStatus = newData[index].visited
      newData[index].visited = !prevStatus;
      return newData;
    })
    console.log(`${data[index].name} : ${data[index].visited}`)
  }

  return (
    <List>
      <ListSubheader>
        <div className={classes.center}>
          <h3>You've explored {countVisitedParks()} National Parks!</h3>
        </div>
      </ListSubheader>
      {data.map((value, index) => {
        return (
          <ListItem key={index} >
            <ListItemButton onClick={() => setVisited(index)}>
              <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center", height: "90px", width: "300px", borderStyle: "solid", backgroundColor: value.visited ? value.color : "white" }}>
                <ListItemIcon>
                  <p style={{fontWeight: "bold"}}>{value.name}</p>
                </ListItemIcon>
              </Box>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}