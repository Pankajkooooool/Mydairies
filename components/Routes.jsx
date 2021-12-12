import React from "react";
import {  Routes,Route} from "react-router-dom";
import About from "./About";
import AddNote from "./AddNote";
import Login from './Login'
import Signup from './Signup'
import Home from "./Home";

const Rooutes = () => {
  
    return (
        <div>
            
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="/about" element={<About />} />
                    <Route path="/addnote" element={<AddNote />} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/signup"  element={<Signup/>}/>
                </Routes>
            
        </div>
    )
}

export default Rooutes
