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
		selectedInstitutesId: [],
		searchTerm: "",
		field: "name",
		currentPage: 0,
		itensPerPage: 20,
		lastPage: 0
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

	searchComboChange = (event) => {	
		this.setState({field : event.target.options[event.target.selectedIndex].value});
	}

	txtSearch_change = (event) => {
		this.setState({searchTerm: event.target.value})
	}

	//	Metodo antigo, preenchia a lista com todos os itens existentes no banco
	// fillList = () => {
	// 	const url = window.server + "/institute";
	// 	fetch(url)
	// 	.then((response) => response.json())
	// 	.then((data) =>  this.setState({institutes : data}))
	// }
	
	fillList = () => {
		const url = `${window.server}/institute/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}`;
		fetch(url)
		.then((response) => response.json())
		.then((json) => {
			this.state.lastPage = Number(json.totalPages) - 1;
			
			var data = {
				institutes : json.content,
				pageable : json.pageable
			};
			return data
		})
		.then((data) =>  {
			this.setState({institutes : data.institutes});
			this.setState({currentPage: Number(data.pageable.pageNumber)});
		})
		.catch(e => {this.clearPagination()})
	}

	search = () => {
		if(this.state.searchTerm){
			const url = `${window.server}/institute/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}&${this.state.field}=${this.state.searchTerm}`;
			fetch(url)
			.then((response) => response.json())
			.then((json) => {
				this.state.lastPage = Number(json.totalPages) - 1;
				
				var data = {
					institutes : json.content,
					pageable : json.pageable
				};
				return data
			})
			.then((data) =>  {
				this.setState({institutes : data.institutes});
				this.setState({currentPage: Number(data.pageable.pageNumber)});
			})
			.catch(e => {this.clearPagination()})
		
		}
		else{
			this.fillList();
		}
	}
	
	fillOrSearch = () => {
		if(this.state.searchTerm)
			this.search();
		else
			this.fillList();
	}

	searchButtonClicked = () => {
		this.clearPagination();
		this.search();
	}

	//Métodos para navegar entre as páginas da lista exibida
	goToFirstPage = () => {
		if(this.state.currentPage != 0){
			this.state.currentPage = 0;
			this.fillOrSearch();
		}
	}
	
	goToPreviousPage = () => {
		if(this.state.currentPage > 0){
			this.state.currentPage--;
			this.fillOrSearch();
		}

	}

	goToNextPage = () => {
		if(this.state.currentPage < this.state.lastPage){
			this.state.currentPage++;
			this.fillOrSearch();
		}

	}

	goToLastPage = () => {
		if(this.state.currentPage != this.state.lastPage){
			this.state.currentPage = this.state.lastPage;
			this.fillOrSearch();
		}
	}
	//Fim
	
	clickWithEnter = (event, buttonId) => {
		event.preventDefault();
		if (event.keyCode === 13) 
			document.getElementById(buttonId).click();
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

	clearPagination = () => {
		this.state.currentPage=0;
		this.state.lastPage=0;
		this.state.limit=20;
	}
	
	itensQuantityComboChange = (event) => {
		this.clearPagination();
		this.setState({itensPerPage : event.target.options[event.target.selectedIndex].value}, () => this.fillOrSearch());
	}

	beginInsertion = () => {
		this.clearState();
		this.setState({including: true})
	}

	beginEdit = (institute) => {
		this.clearState();
		this.setState({creating: false})
		this.setState({editing: true, id: institute.id, name: institute.name, acronym: institute.acronym})
	}

	hideAlert = (alertid) => {
		alert = document.getElementById(alertid);
		if(alert)
			alert.hidden = true;	
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

		var url = window.server + '/institute';

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
			url+="/" + data.id;
		}

		fetch(url, requestOptions)
			.then((response) => {
				if(response.ok){
					document.getElementById('btnCloseModal').click();
					this.clearState();
					this.clearPagination();
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
			if(institutes.length==0)
				alert("Nenhum elemento selecionado");
			else
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
				<div className="row mt-4 search-bar ">
					<div className="col-10 mx-auto ">
						
						<table className="table table-light border border-secondary border-2 align-middle  bg-light " id="search-table">
							<thead>
									<tr>
										<th className="w-5 text-center">
												<label htmlFor="formSearchInput" className="form-label">Termo:</label>
										</th>
										<th className="w-30">
												<input type="search" className="form-control" id="txtSearch" placeholder="Instituto X" value={this.state.searchTerm} onChange={this.txtSearch_change} onKeyUp={(e) => this.clickWithEnter(e, 'searchButton')}/>
										</th>
										<th className="w-5 text-center">
												<label htmlFor="searchCombo" className="form-label">Campo:</label>
										</th>
										<th className="w-20">
												<select className="form-select" arial-label="Combo for search field" defaultValue="name" id="searchCombo" onChange={this.searchComboChange}>
														<option value="name">Nome</option>
														<option value="acronym">Acrônimo</option>
												</select>
										</th>
										<th className="w-35 text-center">
											<button className="btn btn-primary" onClick={this.searchButtonClicked} id="searchButton">Pesquisar</button>
										</th>
									</tr>
							</thead>
						</table>
						
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
									{ (this.state.institutes && this.state.institutes.length>0) ? (this.state.institutes.map( institute => {
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
									})) : (
										<tr>
											<td colSpan="4" className="text-center">Sem itens para exibir</td>
										</tr>)}
								</tbody>
							</table>
							<div className='row'>
								<div className='col-2'>
									<label htmlFor="itensQuantityCombo" className="form-label fw-lighter font-small me-2">Itens / pág.</label>
									<select className="form-select form-select-sm d-inline" arial-label="Combo for itens per page" value={this.state.itensPerPage} onChange={this.itensQuantityComboChange} id='itensQuantityCombo'>
											<option value="5">5</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
											<option value="25">25</option>
									</select>
								</div>
								<div className='col-7 text-center '>
									<button className="btn btn-danger m-1" onClick={() => this.beginDeletion(this.state.selectedInstitutesId)}>Excluir seleção</button>
								</div>
								<div className='col-3 text-end'>
									<p className='fw-lighter font-small me-2 d-inline'>Pág. atual:</p>
									<button onClick={this.goToFirstPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-left"></i></button>
									<button onClick={this.goToPreviousPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-left"></i></button>
									<p className='d-inline ps-2 pe-2 fs-6 align-middle'>{this.state.currentPage+1}</p>
									<button onClick={this.goToNextPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-right"></i></button>
									<button onClick={this.goToLastPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-right"></i></button>
								</div>
							</div>
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
										<input value={this.state.acronym} onChange={this.txtAcronym_change} onKeyUp={(e) => this.clickWithEnter(e, 'saveInsertion')} className='form-control name-pull-image' type='text'></input>
									</div>
								</div>
							</div>
							<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-primary" onClick={() => this.save()} id='saveInsertion'>Salvar</button>
							</div>
							</div>
					</div>
				</div>
			</div>
    )
  }

}
