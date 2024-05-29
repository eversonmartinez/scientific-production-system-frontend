import React, { Component } from 'react';

export default class GraphGenerator extends Component {
    render() {
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <br />
                        <h1>Gerador de Grafo</h1>
                    </div>
                </div>
                <hr />
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="institutes" className="form-label me-2">Institutos:</label>
                        <select className="form-select" id="institutes">
                            <option value="all">Todos</option>
                            <option value="i1">I1</option>
                            <option value="i2">I2</option>
                        </select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="production" className="form-label me-2">Produção:</label>
                        <select className="form-select" id="production">
                            <option value="all">Todos</option>
                            <option value="p1">P1</option>
                            <option value="p2">P2</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="researcher" className="form-label me-2">Pesquisador:</label>
                        <select className="form-select" id="researcher">
                            <option value="all">Todos</option>
                            <option value="jose">José</option>
                            <option value="maria">Maria</option>
                        </select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="vertexType" className="form-label me-2">Tipo de vértice:</label>
                        <select className="form-select" id="vertexType">
                            <option value="researcher">Pesquisador</option>
                            <option value="institute">Instituto</option>
                        </select>
                    </div>
                </div>
                
                <table className="table text-white">
                    <thead>
                        <tr className="text-center table-dark">
                            <th scope="col"></th>
                            <th scope="col">Início</th>
                            <th scope="col">Fim</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Vermelho</th>
                            <td>1</td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                        <tr>
                            <th scope="row">Amarelo</th>
                            <td><input type="number" className="form-control" /></td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                        <tr>
                            <th scope="row">Verde</th>
                            <td><input type="number" className="form-control" /></td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success">Aplicar</button>
                    </div>
                </div>
            </div>
        );
    }
}
