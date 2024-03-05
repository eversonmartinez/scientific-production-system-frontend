import React, { Component } from 'react'

export default class Instituto extends Component {
  render() {
    return (
        <div className='col-12 mt-5 pt-3'>
            <div className="row">
            <div className="col-12">
                <h1>Instituto</h1>
            </div>
            </div>
            <div className="row mt-4 search-bar">
                <div className="col-10 mx-auto">
                    <form>
                        <table className="table border align-middle table-responsive">
                            <thead>
                                <tr className>
                                    <th className="w-5 text-center">
                                        <label for="formSearchInput" className="form-label">Termo:</label>
                                    </th>
                                    <th className="w-30">
                                        <input type="search" className="form-control" id="formSearchInput" placeholder="Instituto X"/>
                                    </th>
                                    <th className="w-5 text-center">
                                        <label for="comboSearch" className="form-label">Campo:</label>
                                    </th>
                                    <th className="w-20">
                                        <select className="form-select" arial-label="Default select example">
                                            <option selected>Todos</option>
                                            <option>Nome</option>
                                            <option>Acrônimo</option>
                                        </select>
                                    </th>
                                    <th className="w-35 text-center">
                                        <button className="btn btn-primary">Pesquisar</button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-9 mx-auto">
                    <table className="table table-bordered">
                        <thead className="text-center">
                            <th>Seleção</th>
                            <th className="w-75">Nome</th>
                            <th className="w-30">Acrônimo</th>
                            <th>Funções</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center"><input className="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade 1</td>
                                <td className="text-center">XPTO</td>
                                <td className="text-center">
                                    <button className="btn btn-primary"><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-primary"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center"><input className="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade 2</td>
                                <td className="text-center">XPTOX</td>
                                <td className="text-center">
                                    <button className="btn btn-primary"><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-primary"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center"><input className="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade n</td>
                                <td className="text-center">XPTON</td>
                                <td className="text-center">
                                    <button className="btn btn-primary"><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-primary"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td colspan="4" className="text-center">
                                <button className="btn btn-danger">Excluir seleção</button>
                                <button className="btn btn-success">Adicionar</button>
                            </td>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
  }
}
