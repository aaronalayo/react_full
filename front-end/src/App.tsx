import React from 'react';
import { Routing } from './Routing';
import * as Sentry from "@sentry/react";
import './App.css';

function App() {
  return (
    <div className="App">
     <Routing/>
    </div>
    
  );
}

export default Sentry.withProfiler(App);


//export default App;
