import React from 'react';
import NumberList from './components/utah/NumberList';
import NumberList2 from './components/ohio/NumberList2';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Phone Number and Contact Management</h1>
        <div className="lists">
            <NumberList />
            <NumberList2 />
        </div>
    </div>
  );
}

export default App;