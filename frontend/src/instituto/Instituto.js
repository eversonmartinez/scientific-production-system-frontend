import React, { Component } from 'react';
import '../styles/Instituto.css';

export default class Instituto extends Component {
  
	state = {
		id: "",
		nome: "",
		acronimo: ""
	}

	txtNome_change = (event) => {
		this.setState({nome: event.target.value})
	}
	
	txtAcronimo_change = (event) => {
		this.setState({acronimo: event.target.value})
	}

	gravarNovo = () => {
		const dados = {
			"nome": this.state.nome,
			"acronimo": this.state.acronimo
		}

		const requestOptions = {
			method: 'POST',
			header: {
				// 'Access-Control-Allow-Origin': 'http://localhost:3000/',
				// 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 
				'Content-type': 'application/json'
			},
			body: JSON.stringify(dados)
		};

		const url = 'http://localhost:8080/institute';

		fetch(url, requestOptions)
		.then(console.log('Gravado'))
		.catch(erro => console.log(erro));
	}

	render() {
    return (    
			<div className='col-12 mt-5 mb-5 pt-3'>
				<div className="row">
					<div className="col-12">
							<h1>Instituto</h1>
					</div>
				</div>
				<div className="row mt-4 search-bar">
					<div className="col-10 mx-auto">
							<form>
									<table className="table border align-middle" id="search-table">
											<thead>
													<tr className>
															<th className="w-5 text-center">
																	<label htmlFor="formSearchInput" className="form-label">Termo:</label>
															</th>
															<th className="w-30">
																	<input type="search" className="form-control" id="formSearchInput" placeholder="Instituto X"/>
															</th>
															<th className="w-5 text-center">
																	<label htmlFor="comboSearch" className="form-label">Campo:</label>
															</th>
															<th className="w-20">
																	<select className="form-select" arial-label="Default select example" defaultValue={'Todos'}>
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
								<table className="table table-bordered" id="data-table">
										<thead className="text-center">
											<tr>
													<th></th>
													<th>Nome</th>
													<th>Acrônimo</th>
													<th>Funções</th>
											</tr>
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
												<tr>
													<td colSpan="4" className="text-center p-1">
															<button className="btn btn-danger m-1">Excluir seleção</button>
															<button type="button" className="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#insertionModal">Adicionar</button>
													</td>
												</tr>
										</tfoot>
								</table>
						</div>
				</div>

				{/* <!-- Modal --> */}
				<div className="modal fade" id="insertionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="insertionModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title fs-5" id="insertionModalTitle">Acrescentar instituto</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<div className='row mt-2'>
									<div className='col-2'>
										Id
									</div>
								<div className='row mt-2'>
									<div className='col-2'>
										<input value={this.state.id} className='form-control' type='text' aria-label='Id não editável' readOnly></input>
									</div>
								</div>
								</div>
								<div className='row mt-2'>
									<div className='col-2'>
										Nome:
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-11'>
										<input value={this.state.nome} onChange={this.txtNome_change} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-2'>
										Acrônimo
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-6'>
										<input value={this.state.acronimo} onChange={this.txtAcronimo_change} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
							</div>
							<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-primary" onClick={() => this.gravarNovo()}>Salvar</button>
							</div>
							</div>
					</div>
				</div>
			</div>
    )
  }
}
