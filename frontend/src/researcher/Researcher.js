import React, { Component } from 'react';

export default class Pesquisador extends Component {
  render() {
    return (
    <div className="container mt-5">
      <h1 className="mb-3">CRUD</h1>
      <hr />

      {/* Retângulo com bordas */}
      <div className="border rounded p-3 bg-light mb-3">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="term" className="form-label">Termo</label>
            <input type="text" className="form-control" id="term" />
          </div>
          <div className="col-md-3">
            <label htmlFor="order" className="form-label">Campo</label>
            <select className="form-select" id="order">
              <option value="all">Todos</option>
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="button" className="btn btn-primary">Buscar</button>
          </div>
        </div>
      </div>

      {/* Label Pesquisadores */}
      <div className="mb-3">
        <label className="form-label">Pesquisadores</label>
      </div>

      {/* Caixa cinza clara */}
      <div className="bg-light p-3 mb-3">
        <div className="row">
          <div className="col">
            <label className="form-label">Nome</label>
          </div>
          <div className="col">
            <label className="form-label">E-mail</label>
          </div>
          <div className="col">
            <label className="form-label">Instituto</label>
          </div>
        </div>
        {/* Aqui você deve mapear os dados do banco de dados */}
        {/* Exemplo de mapeamento de dados fictícios */}
      {/*  {this.props.nomesDoBancoDeDados.map((nome, index) => (
          <div className="row" key={index}>
            <div className="col">
              <p>{nome}</p>
            </div>
            
            <div className="col">
              <p>E-mail do nome</p>
            </div>
            <div className="col">
              <p>Instituto do nome</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Botões de incluir e excluir */}
      <div className="row text-center">
        <div className="col-md-6">
          <button type="button" className="btn btn-success w-50">Incluir</button>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn btn-danger w-50">Excluir</button>
        </div>
      </div>
    </div>
    </div>
    );
  }
}
