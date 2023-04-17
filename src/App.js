import React, { useEffect } from "react";
import Profile from "./pages/Profile";
import AdminLeaderBoard from "./pages/AdminLeaderBoard";
import UsersPlayCount from "./pages/UsersPlayCount";

import { getuserdata, login, register,updateleadboard } from "./service/firebase/auth";
import { MazeBoard } from "./components/MazeBoard";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthScreen } from "./pages/AuthScreen";
import Appbar from "./components/Appbar";
import { GameScreen } from "./pages/GameScreen";

//login("hemanth@gmail.com", "123456789");
//updateleadboard('Ec6GVKCGLxS3U3tbp0lNltHyE152',300,15,9);
// register({ email: "hemanth@gmail.con", password: 987654321 });

function App() {
  const navigate = useNavigate()
  useEffect(()=>{
  //  navigate('/')
  },[])
  return (
    <>

      <Appbar />
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userPlay" element={<UsersPlayCount />} />
      </Routes>
    </>
  );
}

export default App;
