import React, { Component } from 'react';
import '../styles/Institute.css';
import { Modal } from 'bootstrap';

export default class Instituto extends Component {
  
	state = {
		id: "",
		name: "",
		acronym: ""
	}

	txtName_change = (event) => {
		this.setState({name: event.target.value})
	}
	
	txtAcronym_change = (event) => {
		this.setState({acronym: event.target.value})
	}

	clearState = () => {
		this.setState({id: ""});
		this.setState({name: ""});
		this.setState({acronym: ""});
	}

	showAlert = (alertid) => {
		var alert = document.getElementById(alertid);
		alert.removeAttribute("hidden");
		console.log('showalert');
	}

	showAlert = (alertid, message) => {
		var alert = document.getElementById(alertid);
		alert.querySelector('.alert-message').textContent = message;
		alert.removeAttribute("hidden");
		console.log('showalertwmsg');
	}

	save = () => {
		const data = {
			"name": this.state.name,
			"acronym": this.state.acronym
		}

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		const url = 'http://localhost:8080/institute';

		fetch(url, requestOptions)
		.then((response) => {
			if(response.ok){
				document.getElementById('btnCloseModal').click();
				this.clearState();
				this.showAlert('insertion-success-alert');
			}
			else{
				response.text().then((text) => this.showAlert('insertion-error-alert', text));
			}
		})
		.catch(error => this.showAlert('insertion-error-alert', error));
	}

	render() {
    return (    
			<div className='col-12 mt-5 mb-5 pt-3'>
				<div className="row">
					<div className="col-12">
							<h1>Instituto</h1>
					</div>
				</div>
				<div className="alert alert-success col-2 text-center position-absolute end-0 top-0 mt-5" role="alert" id="insertion-success-alert" hidden>
					<i className="bi bi-check2-circle fs-4"></i> Gravado com sucesso!
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
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='btnCloseModal'></button>
							</div>
							<div className="modal-body">
								<div className="alert alert-danger col-10 text-center mx-auto" role="alert" id="insertion-error-alert" hidden>
									<p><i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>Erro ao gravar</p>
									<hr/>
									<p className='mb-0 alert-message'></p>
								</div>
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
										<input value={this.state.nome} onChange={this.txtName_change} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-2'>
										Acrônimo
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-6'>
										<input value={this.state.acronimo} onChange={this.txtAcronym_change} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
							</div>
							<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-primary" onClick={() => this.save()}>Salvar</button>
							</div>
							</div>
					</div>
				</div>
			</div>
    )
  }
}
