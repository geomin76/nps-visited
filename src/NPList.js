import { List, ListItem, Box, ListItemButton } from '@mui/material';
import { setVisited } from './Service';

export const NPList = ({ data, setData }) => {

  return (
    <List disablePadding>
      {
        data.map((park) => (
          <ListItem key={park.index} style={{ paddingTop: "0", paddingBottom: "0" }}>
            <ListItemButton onClick={() => setVisited(park.index, setData)}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "75px", width: "295px", borderStyle: "solid", borderWidth: "thin", borderRadius: "10px", backgroundColor: park.visited ? park.color : "white" }}>
                <p>{park.name}</p>
              </Box>
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}