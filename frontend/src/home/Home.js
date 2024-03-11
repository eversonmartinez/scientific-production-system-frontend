import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className='col-12 mt-5 mb-5 pt-3'>
        <div className="row">
          <div className="col-12">
            <h1>Pagina inicial</h1>
          </div>
        </div>

        {/* Filtros de Data */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dataInicio" className="form-label">Data Início</label>
            <input type="date" className="form-control" id="dataInicio" />
          </div>
          <div className="col-md-4">
            <label htmlFor="dataFim" className="form-label">Data Fim</label>
            <input type="date" className="form-control" id="dataFim" />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary mt-4">Aplicar</button>
          </div>
        </div>

        {/* Seleção de Unidade, Pesquisador e Tipo de Produção */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="unidade" className="form-label">Unidade</label>
            <select className="form-select" id="unidade">
              <option value="unidade1">Unidade 1</option>
              <option value="unidade2">Unidade 2</option>
              <option value="unidade3">Unidade 3</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="pesquisador" className="form-label">Pesquisador</label>
            <select className="form-select" id="pesquisador">
              <option value="pesquisador1">Pesquisador 1</option>
              <option value="pesquisador2">Pesquisador 2</option>
              <option value="pesquisador3">Pesquisador 3</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoProducao" className="form-label">Tipo de Produção</label>
            <select className="form-select" id="tipoProducao">
              <option value="tipo1">Tipo 1</option>
              <option value="tipo2">Tipo 2</option>
              <option value="tipo3">Tipo 3</option>
            </select>
          </div>
        </div>

        {/* Gráfico Dinâmico */}
        <div className="row">
          <div className="col">
            {/* Aqui você pode adicionar o gráfico dinâmico, utilizando alguma biblioteca como Chart.js */}
          </div>
        </div>
      </div>
    );
  }
}
