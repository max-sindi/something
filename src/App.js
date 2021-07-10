import React from 'react'
import './App.css'
import Bootstrap from './Bootstrap'
import {RecoilRoot} from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Bootstrap />
      </div>
    </RecoilRoot>
  );
}

export default App;
