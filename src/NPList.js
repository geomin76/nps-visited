import { List, ListItem, ListItemIcon, Box, ListItemButton } from '@mui/material';
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
  }

  return (
    <List alignItems="center" disablePadding>
      {data.map((value, index) => {
        return (
          <ListItem key={index} style={{paddingTop: "0", paddingBottom: "0"}}>
            <ListItemButton onClick={() => setVisited(index)} alignItems="center">
              <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center", height: "75px", width: "300px", borderStyle: "solid", borderWidth: "thin", borderRadius: "10px", backgroundColor: value.visited ? value.color : "white" }}>
                <ListItemIcon>
                  <p>{value.name}</p>
                </ListItemIcon>
              </Box>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}