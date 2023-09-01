import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios"; 
import Registration from './Components/Registration';
import Login from './Components/Login';
import Main1 from "./Components/Main1.js";
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
function App() {

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
  axios
    .get("http://localhost:3000/userCredentials")
    .then((response) => setUsersData(response.data))
    .catch((error) => console.error(error));
}, []);
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Main1/>}/>
          <Route path="/dashboard" element ={<Dashboard usersData={usersData}/>}/>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login usersData={usersData}/>} />
          <Route path="/profile" element={<Profile usersData={usersData}/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
