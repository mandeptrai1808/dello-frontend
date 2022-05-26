import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from './Templates/HomeTemplate';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import DrawerTemplate from './Templates/DrawerTemplate';
import Profile from './Pages/Profile';
import ModalTemplate from './Templates/ModalTemplate';
import ShareTable from './Pages/ShareTable';
import React, { useEffect, useState } from "react";
import {io} from 'socket.io-client'
import About from './Pages/About';

export const socket = io.connect("http://localhost:5000");
function App() {


  return (
    <div className="App">
      <DrawerTemplate/>
      <ModalTemplate/>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomeTemplate component={<Homepage socket={socket}/>}/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/profile" element={<HomeTemplate component={<Profile/>}/>}/>
        <Route path="/about" element={<HomeTemplate component={<About/>}/>}/>

        <Route path="/sharetable" element={<HomeTemplate component={<ShareTable/>}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
