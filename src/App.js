import logo from './logo.svg';
import './App.css';
import { parks } from './Parks';
import { useState } from 'react';

function App() {

  const [data, setData] = useState(parks);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
