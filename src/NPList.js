import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Container, Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      overflow: 'auto',
      maxHeight: 500,
      width: '80%',
    //   position: 'relative'
    },
  }),
);

export const NPList = ({ data, setData }) => {
    const classes = useStyles();


    // fix
    const setVisited = (index) => {
        let items = [...data];
        let item = {...items[index]}
        item.visited = true;
        items[index] = item;
        setData(items);
        console.log(`${data[index].name} : ${data[index].visited}`)
    }

    //create unset Visited

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