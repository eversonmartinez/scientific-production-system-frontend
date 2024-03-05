import React, {Component} from 'react';
import './App.css';
import Menu from "./menu/Menu"
import Home from './home/Home'
import Rodape from './rodape/Rodape';
import Instituto from './instituto/Instituto';
// import { Switch } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends React.Component{
  
  render(){
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Menu />
          {/* Implementação antiga para o Routes, mostrada pelo Alan <Switch></Switch> */}
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="/instituto" element={<Instituto />}>
            </Route>
          </Routes>
          <Rodape />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
