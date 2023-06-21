import { List, ListItem, ListItemIcon, Box, ListItemButton } from '@mui/material';
import { setVisited } from './Service';

export const NPList = ({ data, setData }) => {

  return (
    <List alignItems="center" disablePadding>
      {
        data.map((value) => {
          return (
            <>
              {
                value.map((innerVal) => {
                  return (
                    <ListItem key={innerVal.index} style={{ paddingTop: "0", paddingBottom: "0" }}>
                      <ListItemButton onClick={() => setVisited(innerVal.index, setData)}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "75px", width: "295px", borderStyle: "solid", borderWidth: "thin", borderRadius: "10px", backgroundColor: innerVal.visited ? innerVal.color : "white" }}>
                          <ListItemIcon>
                            <p>{innerVal.name}</p>
                          </ListItemIcon>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  )
                })
              }
            </>
          )

        })
      }
    </List>
  )
}