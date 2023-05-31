import { List, ListItem, ListItemIcon, Box, ListItemButton } from '@mui/material';

export const NPList = ({ data, setData }) => {

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
          <ListItem key={index} style={{ paddingTop: "0", paddingBottom: "0" }}>
            <ListItemButton onClick={() => setVisited(index)}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "75px", width: "295px", borderStyle: "solid", borderWidth: "thin", borderRadius: "10px", backgroundColor: value.visited ? value.color : "white" }}>
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