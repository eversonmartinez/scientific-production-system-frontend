import React, { Component } from 'react';
import '../styles/Institute.css';

export default class Instituto extends Component {
  
	state = {
		id: "",
		name: "",
		acronym: "",
		institutes: [],
		including: false,
		editing: false,
		selectedInstitutesId: []
	}

	txtName_change = (event) => {
		this.setState({name: event.target.value})
	}
	
	txtAcronym_change = (event) => {
		this.setState({acronym: event.target.value})
	}

	instituteCheckboxChange = (id) => {
		const selectedIds = this.state.selectedInstitutesId.slice();

		
		if (!selectedIds || selectedIds.length===0){
			this.setState({selectedInstitutesId : [ id ]});
		}
		else if (selectedIds.includes(id)){
			this.setState({selectedInstitutesId : selectedIds.filter(item => item !== id)});
		}
		else{
			selectedIds.push(id)
			this.setState({selectedInstitutesId : selectedIds});
		}
	}

	instituteCheckboxChecked = (institute) => {
		if (this.state.selectedInstitutesId)
			return this.state.selectedInstitutesId.includes(institute.id);
		else
			return false;
	}

	fillList = () => {
		const url = window.server + "/institute";
		fetch(url)
		.then((response) => response.json())
		.then((data) =>  this.setState({institutes : data}))
	}

	componentDidMount() {
		this.fillList();
	}

	clearState = () => {
		this.setState({id: ""});
		this.setState({name: ""});
		this.setState({acronym: ""});
		this.hideAlert('insertion-success-alert');
		this.hideAlert('insertion-error-alert');
	}

	beginInsertion = () => {
		this.clearState();
		this.setState({including: true})
	}

	beginEdit = (institute) => {
		this.clearState();
		this.setState({editing: true, id: institute.id, name: institute.name, acronym: institute.acronym})
	}

	hideAlert = (alertid) => {
		document.getElementById(alertid).hidden = true;
	}

	showAlert = (alertid) => {
		var alert = document.getElementById(alertid);
		alert.removeAttribute("hidden");
	}

	showAlertWithMessage = (alertid, message) => {
		var alert = document.getElementById(alertid);
		if(alert){
			alert.querySelector('.alert-message').textContent = message;
			alert.removeAttribute("hidden");
		}
	}

	save = () => {
		let data;

		let requestOptions;

		if(this.state.including){
			data = {
				"name": this.state.name,
				"acronym": this.state.acronym
			};

			requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};

		}
		else if(this.state.editing){
			data = {
				"id": this.state.id,
				"name": this.state.name,
				"acronym": this.state.acronym
			}

			requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};

		}

		const url = window.server + '/institute';

		fetch(url, requestOptions)
			.then((response) => {
				if(response.ok){
					document.getElementById('btnCloseModal').click();
					this.clearState();
					this.showAlert('insertion-success-alert');
					this.setState({including: false, editing: false});
					setTimeout(() => this.hideAlert('insertion-success-alert'), 5000);
				}
				else{
					response.json().then((data) => data.message).then((text) => this.showAlertWithMessage('insertion-error-alert', text));
				}
			})
				.then()
					.then(() => this.fillList())
						.catch(error => this.showAlertWithMessage('insertion-error-alert', error));
	}

	delete = (instituteId) => {

		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		const url = window.server + '/institute/' + instituteId

		fetch(url, requestOptions)
			.then(() => this.fillList())
				.catch((error) => console.log(error));
	}
	
	beginDeletion = (institutes) => {
		//Os seguintes comentários servem para que o javascript consiga criar a janela de confirmação, não os remova.
		/* eslint-disable*/
		if (Array.isArray(institutes)){
			if (confirm("Deseja excluir selecionado(s)?"))
				institutes.forEach((i) => this.delete(i));
	}
		else{
			if (confirm("Deseja realmente excluir?"))
				this.delete(institutes.id);
		}
		/* eslint-enable*/
	}

	render() {
    return (    
			<div className='col-12 mt-5 mb-5 pt-3'>
				<div className="row">
					<div className="col-12">
							<h1>Instituto</h1>
					</div>
				</div>
				<div className="alert alert-success col-2 text-center position-fixed end-0 top-0 mt-5" role="alert" id="insertion-success-alert" hidden>
					<i className="bi bi-check2-circle fs-4"></i> Gravado com sucesso!
				</div>
				<div className="row mt-4 search-bar">
					<div className="col-10 mx-auto">
						<form>
							<table className="table border align-middle" id="search-table">
								<thead>
										<tr>
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
							<button type="button" className="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#insertionModal" onClick={this.beginInsertion}><i className="bi bi-plus-circle-dotted fs-6 me-2"></i>Adicionar</button>
								<table className="table table-bordered table-hover" id="data-table">
										<thead className="text-center table-dark">
											<tr>
													<th scope='col'></th>
													<th scope='col'>Nome</th>
													<th scope='col'>Acrônimo</th>
													<th scope='col'>Funções</th>
											</tr>
										</thead>
										<tbody className='table-group-divider'>
											{this.state.institutes && this.state.institutes.map( institute => {
												return <tr key={institute.id}>
													<td className='text-center'>
														<input className="form-check-input"  type="checkbox" checked={this.instituteCheckboxChecked(institute)} onChange={() => this.instituteCheckboxChange(institute.id)}/>
													</td>
													<td>{institute.name}</td>
													<td className="text-center">{institute.acronym}</td>
													<td className="text-center">
															<button className="btn btn-primary me-1" data-toggle="tooltip" data-placement="top" title="Editar Instituto" onClick={() => this.beginEdit(institute)} data-bs-toggle="modal" data-bs-target="#insertionModal"><i className="bi bi-pencil"></i></button>
															<button className="btn btn-primary mw-1" data-toggle="tooltip" data-placement="top" title="Excluir selecionado" onClick={() => this.beginDeletion(institute)}><i className="bi bi-trash"></i></button>
													</td>
												</tr>
											})}
										</tbody>
										<tfoot>
											<tr>
												<td colSpan="4" className="text-center p-1">
													<button className="btn btn-danger m-1" onClick={() => this.beginDeletion(this.state.selectedInstitutesId)}>Excluir seleção</button>
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
										<input value={this.state.name} onChange={this.txtName_change} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-2'>
										Acrônimo
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-6'>
										<input value={this.state.acronym} onChange={this.txtAcronym_change} className='form-control name-pull-image' type='text'></input>
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
