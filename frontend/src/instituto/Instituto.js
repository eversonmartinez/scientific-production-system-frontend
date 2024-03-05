import React, { Component } from 'react'

export default class Instituto extends Component {
  render() {
    return (
        <div className='col-12 mt-5 pt-3'>
            <div class="row">
            <div class="col-12">
                <h1>Instituto</h1>
            </div>
            </div>
            <div class="row mt-4 search-bar">
                <div class="col-10 mx-auto">
                    <form>
                        <table class="table border align-middle table-responsive">
                            <thead>
                                <tr class>
                                    <th class="w-5 text-center">
                                        <label for="formSearchInput" class="form-label">Termo:</label>
                                    </th>
                                    <th class="w-30">
                                        <input type="search" class="form-control" id="formSearchInput" placeholder="Instituto X"/>
                                    </th>
                                    <th class="w-5 text-center">
                                        <label for="comboSearch" class="form-label">Campo:</label>
                                    </th>
                                    <th class="w-20">
                                        <select class="form-select" arial-label="Default select example">
                                            <option selected>Todos</option>
                                            <option>Nome</option>
                                            <option>Acrônimo</option>
                                        </select>
                                    </th>
                                    <th class="w-35 text-center">
                                        <button class="btn btn-primary">Pesquisar</button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-9 mx-auto">
                    <table class="table table-bordered">
                        <thead class="text-center">
                            <th>Seleção</th>
                            <th class="w-75">Nome</th>
                            <th class="w-30">Acrônimo</th>
                            <th>Funções</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center"><input class="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade 1</td>
                                <td class="text-center">XPTO</td>
                                <td class="text-center">
                                    <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-primary"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center"><input class="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade 2</td>
                                <td class="text-center">XPTOX</td>
                                <td class="text-center">
                                    <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-primary"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center"><input class="form-check-input" value="" type="checkbox"/></td>
                                <td>Unidade n</td>
                                <td class="text-center">XPTON</td>
                                <td class="text-center">
                                    <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-primary"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td colspan="4" class="text-center">
                                <button class="btn btn-danger">Excluir seleção</button>
                                <button class="btn btn-success">Adicionar</button>
                            </td>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
  }
}
