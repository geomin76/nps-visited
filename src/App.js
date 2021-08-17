import logo from './logo.svg';
import './App.css';
import { parks } from './Parks';
import { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

function App() {

  const [data, setData] = useState(parks);
  
  const setVisited = (index) => {
    setData(prev => [...prev, prev[index].visited = true])
    console.log(`${data[index].name} : ${data[index].visited}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <List>
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
      </header>
    </div>
  );
}

export default App;
