import React from 'react';
import './App.scss';
import "bootstrap/dist/js/bootstrap"
import Routes from "../src/pages/Routes"
import { useAuthContext } from './context/AuthContext';
import ScreenLoader from './components/ScreenLoader';

function App() {
  const {isAppLoading} = useAuthContext()
  return (
    <>
    {
      isAppLoading ? (
        <ScreenLoader/>
      ):

    <Routes/>
    }
    
    </>
  );
}

export default App;
