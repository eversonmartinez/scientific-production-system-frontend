import React, {Component} from 'react';
import './App.css';
import Menu from "./menu/Menu"
import Categoria from './categoria/Categoria';
import Home from './home/Home'
import Rodape from './rodape/Rodape';
import Instituto from './instituto/Instituto';

class App extends React.Component{
  
  render(){
    return (
      <div className="container-fluid">
        <Menu />
        <Instituto />
        <Rodape />
      </div>
    );
  }
}

export default App;
