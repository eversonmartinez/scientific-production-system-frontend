import React, {Component} from 'react';
import './App.css';
import Menu from "./menu/Menu"
import Home from './home/Home'
import Rodape from './footer/Footer';
import Instituto from './institute/Institute';
import Pesquisador from './researcher/Researcher';
// import { Switch } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap';

import * as bootstrap from 'bootstrap';
import ItensProducao from './production-itens/ProductionItems';

window.bootstrap = bootstrap;

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
            <Route path="/pesquisador" element={<Pesquisador />}>
            </Route>
            <Route path="/itensProducao" element={<ItensProducao />}>
            </Route>
          </Routes>
          <Rodape />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
