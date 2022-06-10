import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter, Routes } from 'react-router-dom';
import { Home } from './componentes/Home';
import { GrillaInstrumento } from './componentes/GrillaInstrumento';
import { DetalleInstrumento } from './componentes/DetalleInstrumento';
import { FrmInstrumento } from './componentes/FrmInstrumento';

class AppCasaInstrumento extends Component{
  
  render(){
    return (
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/grilla" element={<GrillaInstrumento/>}/> 
            <Route path="/buscar/:termino" element={<Home/>}/> 
            <Route path="/formulario/:idinstrumento" element={<FrmInstrumento/>}/>
            <Route path="/detalle"></Route>
            <Route path=":idInstrumento" element={<DetalleInstrumento />}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
         
        </BrowserRouter>
    );
  }
}

export default AppCasaInstrumento;
