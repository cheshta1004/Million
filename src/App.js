import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Stats from './Pages/Stats';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import "./index.css";
import { UserProvider } from 'C:/Users/chesh/OneDrive/Desktop/Million/src/Components/Context.js';
export default function App(){
    return (
        <>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
          <Footer />
          </UserProvider>
        </>
      );
}


