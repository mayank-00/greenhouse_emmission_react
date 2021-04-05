import React, { useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import './App.css';
// import 'leaflet/dist/leaflet.css';

import Sidebar from 'components/sidebar';
// import Map from "components/map";

import { createIndexing } from "utils/data"

function App() {

  useEffect(() => {
    createIndexing()
  }, [])

  return (
    <Router>
      <div className="App">
        <Sidebar />
        {/* <Map /> */}
      </div>
    </Router>
  );
}

export default App;
