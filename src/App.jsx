import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import Form from './Components/Form';
import Home from './Components/Home';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route exact path='/form' element={<Form />} />
        <Route exact path="/" element={<Home />} />

      </Routes>


    </Router>
  )
}

export default App