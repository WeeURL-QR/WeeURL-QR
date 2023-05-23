import React, { Component } from 'react';
import { Routes, Route, Link} from 'react-router-dom';

import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';

// import Visits from './client/component/Visits'

function App() {
    return (
        <div>
            <Navbar />
            <Routes> 
                <Route path ='/' element={<Home />}> </Route>
                {/* <Route path = '/visits' element = {<Visits />}></Route> */}
            </Routes>
        </div>

    );
};

export default App; 