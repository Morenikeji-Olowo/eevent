import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome';
import './App.css';
import Authenticate from './Pages/Authenticate/Authenticate';
import { ToastContainer } from 'react-toastify';
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 
import 'react-toastify/dist/ReactToastify.css'; // toast styles
import CollectData from './Pages/CollectingInfoOnLoad/CollectData';
import DashBoard from './Pages/DashBoard/DashBoard';
import FirstScreen from './Pages/DashBoard/FirstScreen/FirstScreen';
import EventForm from './Pages/DashBoard/PlanEvent/PlanEvent';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); 
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path='/getDetails' element={<CollectData/>} />

        <Route path='/DashBoard' element={<DashBoard />} >
          <Route index element = {<EventForm/>} />
        </Route>
      </Routes>


      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
