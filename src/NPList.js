import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      overflow: 'auto',
      maxHeight: 500,
      width: '80%',
    },
  }),
);

export const NPList = ({ data, setData }) => {
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
        <List className={classes.list}>
        {data.map((value, index) => {
          return (
            <ListItem key={index} onClick={() => setVisited(index)}>
              <ListItemIcon>
                <Checkbox checked={value.visited}/>
                <ListItemText primary={`${value.name}`}/>
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
    )
}