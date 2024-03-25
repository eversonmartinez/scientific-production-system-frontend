import React, { Component } from 'react';
import '../styles/Researcher.css';

export default class Pesquisador extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    idInstituto: "",
    selectedInstituteId: '',
    selectedInstituteName: '',
    institutes: [],
    including: false,
    editing: false,
    selectedResearchersId: [],
    searchTerm: "",
		field: "name",
		currentPage: 0,
		itensPerPage: 20,
		lastPage: 0,
    instituteSearchTerm: ''
  }

  // Função para atualizar o estado do nome
  txtName_change = (event) => {
    this.setState({name: event.target.value})
  }

  // Função para atualizar o estado do email
  txtEmail_change = (event) => {
    this.setState({email: event.target.value})
  }

  // Função para manipular a seleção/deseleção de pesquisadores
  researcherCheckboxChange = (id) => {
    // Cria uma cópia do array selectedResearchersId
    const selectedIds = this.selectedResearchersId.slice();

    // Se o array for vazio ou null, adiciona o id ao array
    if (!selectedIds || selectedIds.length === 0) {
      this.setState({selectedResearchersId: [id]});
    } else if (selectedIds.includes(id)) {
      // Se o id estiver presente (foi selecionado), remove-o do array
      this.setState({selectedResearchersId: selectedIds.filter(item => item !== id)});
    } else {
      // Se o id não estiver no array, adiciona-o
      selectedIds.push(id);
      this.setState({selectedResearchersId: selectedIds})
    }
  }

  // Função para verificar se um pesquisador está selecionado
  researcherCheckboxChecked = (researcher) => {
    if (this.state.selectedResearchersId) {
      return this.state.selectedResearchersId.includes(researcher.id);
    } else {
      return false;
    }
  }

  instituteCheckboxChange = (institute) => {
    this.setState({selectedInstituteId: institute.id, selectedInstituteName: institute.name});
  }

  searchComboChange = (event) => {	
		this.setState({field : event.target.options[event.target.selectedIndex].value});
	}

	txtSearch_change = (event) => {
		this.setState({searchTerm: event.target.value})
	}

  txtInstituteSearch_change = (event) => {
		this.setState({instituteSearchTerm: event.target.value})
	}

  // Função para preencher a lista de pesquisadores
	fillList = () => {
		const url = `${window.server}/researcher/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}`;
		fetch(url)
		.then((response) => response.json())
		.then((json) => {
			this.state.lastPage = Number(json.totalPages) - 1;
			
			var data = {
				researchers : json.content,
				pageable : json.pageable
			};
			return data
		})
		.then((data) =>  {
			this.setState({researchers : data.researchers});
			this.setState({currentPage: Number(data.pageable.pageNumber)});
		})
		.catch(e => {this.clearPagination()})
	}

  search = () => {
		if(this.state.searchTerm){
			const url = `${window.server}/researcher/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}&${this.state.field}=${this.state.searchTerm}`;
			fetch(url)
			.then((response) => response.json())
			.then((json) => {
				this.state.lastPage = Number(json.totalPages) - 1;
				
				var data = {
					researchers : json.content,
					pageable : json.pageable
				};
				return data
			})
			.then((data) =>  {
				this.setState({researchers : data.researchers});
				this.setState({currentPage: Number(data.pageable.pageNumber)});
			})
			.catch(e => {this.clearPagination()})
		
		}
		else{
			this.fillList();
		}
	}

  instituteSearch = () => {
		if(this.state.instituteSearchTerm){
			const url = `${window.server}/institute/search?page=0&limit=15&field=name&term=${this.state.instituteSearchTerm}`;
			fetch(url)
			.then((response) => response.json())
			.then((json) => json.content)
			.then((data) =>  {
				this.setState({institutes : data});
			})
			.catch(e => {console.log(e)})
		
		}
		else{
			this.fillInstitutesList();
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

  searchInstituteButtonClicked = () => {
		this.clearPagination();
		this.instituteSearch();
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

  clickWithEnter = (event, buttonId) => {
		event.preventDefault();
		if (event.keyCode === 13) 
			document.getElementById(buttonId).click();
	}

	componentDidMount() {
		this.fillList();
    this.fillInstitutesList();
	}

  // Função para limpar o estado do componente
  clearState = () => {
    // Reiniciando os valores dos estados id, name e email
    this.setState({id: '', name: '', email: '', idInstituto:'', selectedInstituteId: '', selectedInstituteName:''});
    // Escondendo alertas
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

  beginEdit = (researcher) => {
		this.clearState();
		this.setState({editing: true, id: researcher.id, name: researcher.name, email: researcher.email})
	}

  // hideAlert = (alertid) => {
	// 	document.getElementById(alertid).hidden = true;
	// }

  hideAlert = (alertid) => {
    var alertElement = document.getElementById(alertid);
    if (alertElement) {
        alertElement.hidden = true;
    }
  }

  showAlert = (alertid) => {
		var alert = document.getElementById(alertid);
		alert.removeAttribute("hidden");
	}

  showAlertWithMessage = (alertid, message) => {
		var alert = document.getElementById(alertid);
		if(alert){
			alert.querySelector('.alert-message').textContent = message;
			
		}
	}

  toggleList = () => {
    var list = document.getElementById('tableInstitutes');
    var icon = document.getElementById('showListButton');

    if(list.hidden){
      list.hidden = false;
      icon.classList.remove('bi-caret-down-square');
      icon.classList.add('bi-caret-up-square');
    }
    else{
      list.hidden = true;
      icon.classList.remove('bi-caret-up-square');
      icon.classList.add('bi-caret-down-square');
    }
  }

  save = () => {
		let data = {
      "id": this.state.id,
      "institute_id": this.state.selectedInstituteId
    };

		let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

		var url = window.server + '/researcher';

		//if(this.state.including){}

    /*Precisei comentar o modelo de edição para criar o novo método de salvar, utlizando o formato que Gurgel criou. Após isso será neessário reestruturar esse método*/
		// else if(this.state.editing){
		// 	data = {
		// 		"id": this.state.id,
		// 		"name": this.state.name,
		// 		"email": this.state.email
		// 	}
      
		// 	requestOptions = {
		// 		method: 'PUT',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(data)
		// 	};
		// 	url+="/" + data.id;
		// }

		fetch(url+'/curriculum', requestOptions)
			.then((response) => response.json())
      .then((data) => {
        //Os seguintes comentários servem para que o javascript consiga criar a janela de confirmação, não os remova.
		    /* eslint-disable*/
        if(confirm("Deseja mesmo incluir o Lattes " + data.id + " de " + data.name + " na " + data.institute.name + "?")){
          if(this.state.including){
            requestOptions.method = 'POST';
            requestOptions.body = JSON.stringify(data);
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
        }
        /*eslint-enable*/
      })
      
      
  //     {
	// 			if(response.ok){
	// 				document.getElementById('btnCloseModal').click();
	// 				this.clearState();
	// 				this.clearPagination();
	// 				this.showAlert('insertion-success-alert');
	// 				this.setState({including: false, editing: false});
	// 				setTimeout(() => this.hideAlert('insertion-success-alert'), 5000);
	// 			}
	// 			else{
	// 				response.json().then((data) => data.message).then((text) => this.showAlertWithMessage('insertion-error-alert', text));
	// 			}
	// 		})
	// 			.then()
	// 				.then(() => this.fillList())
	// 					.catch(error => this.showAlertWithMessage('insertion-error-alert', error));
	}

	delete = (researcherId) => {

		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		const url = window.server + '/researcher/' + researcherId

		fetch(url, requestOptions)
			.then(() => this.fillList())
				.catch((error) => console.log(error));
	}

  beginDeletion = (researchers) => {
		//Os seguintes comentários servem para que o javascript consiga criar a janela de confirmação, não os remova.
		/* eslint-disable*/
		if (Array.isArray(researchers)){
			if (confirm("Deseja excluir selecionado(s)?"))
				researchers.forEach((r) => this.delete(r));
	}
		else{
			if (confirm("Deseja realmente excluir?"))
				this.delete(researchers.id);
		}
		/* eslint-enable*/
	}

  fillInstitutesList = () => {
    // Fazer a requisição para o endpoint de institutos
    fetch(window.server + '/institute')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ institutes: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar institutos:', error);
      });
  };


  render() {
    return (
      <div className="container mt-5">
        	<div className="row">
            <div className="col-12">
              <br></br>
                <h1>Pesquisadores</h1>
            </div>
				  </div>
        <hr />

        {/* Retângulo com bordas */}
        <div className="border rounded p-3 bg-light mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="term" className="form-label">Termo</label>
              <input type="text" className="form-control" id="term" placeholder="Pesquisadores nome"/>
            </div>
            <div className="col-md-3">
              <label htmlFor="order" className="form-label">Campo</label>
              <select className="form-select" id="order" defaultValue={'Todos'}>
                <option value="all">Nome</option>
                <option value="asc">E-mail</option>
                <option value="desc">Instituto</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="button" className="btn btn-primary" onClick={this.searchButtonClicked} id="searchButton">Pesquisar</button>
            </div>
          </div>
        </div>

        <table className="table bg-dark text-white">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Instituto</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
              { (this.state.researchers && this.state.researchers.length>0) ? (this.state.researchers.map( researcher => {
                return <tr key={researcher.id}>
                  <td className='text-center'>
                    <input className="form-check-input"  type="checkbox" checked={this.researcherCheckboxChecked(researcher)} onChange={() => this.researcherCheckboxChange(researcher.id)}/>
                  </td>
                  <td>{researcher.name}</td>
                  <td className="text-center">{researcher.email}</td>
                  <td className="test-center">{researcher.institute}</td>
                  <td className="text-center">
                      <button className="btn btn-primary me-1" data-toggle="tooltip" data-placement="top" title="Editar Instituto" onClick={() => this.beginEdit(researcher)} data-bs-toggle="modal" data-bs-target="#insertionModal"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-primary mw-1" data-toggle="tooltip" data-placement="top" title="Excluir selecionado" onClick={() => this.beginDeletion(researcher)}><i className="bi bi-trash"></i></button>
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
          <div className='col-3 text-end'>
              <p className='fw-lighter font-small me-2 d-inline'>Pág. atual:</p>
              <button onClick={this.goToFirstPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-left"></i></button>
              <button onClick={this.goToPreviousPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-left"></i></button>
              <p className='d-inline ps-2 pe-2 fs-6 align-middle'>{this.state.currentPage+1}</p>
              <button onClick={this.goToNextPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-right"></i></button>
              <button onClick={this.goToLastPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-right"></i></button>
					</div>
        </div>


        {/* Botões de incluir e excluir */}
        <div className="row text-center">
          <div className="col-md-6">
            <button type="button" className="btn btn-success w-50"  data-bs-toggle="modal" data-bs-target="#insertionModal" onClick={this.beginInsertion}><i className="bi bi-file-earmark-plus fs-6 me-2"></i>Incluir</button>
          </div>
          <div className="col-md-6">
            <button type="button" className="btn btn-danger w-50" onClick={() => this.beginDeletion(this.state.selectedResearchersId)}>Excluir</button>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="insertionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="insertionModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title fs-5" id="insertionModalTitle">Acrescentar pesquisador</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='btnCloseModal'></button>
                  </div>
                  <div className="modal-body">
                    <div className="alert alert-danger col-10 text-center mx-auto" role="alert" id="insertion-error-alert" hidden>
                        <p><i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>Erro ao gravar</p>
                        <hr/>
                        <p className='mb-0 alert-message'></p>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-12'>
                            <label htmlFor="newIdInput" className="form-label">Informe um novo ID:</label>
                            <input id="newIdInput" value={this.state.newId} onChange={this.handleNewIdChange} className='form-control' type='text' aria-label='Informe um novo ID'></input>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-12'>
                            <p className="form-label">Informe o instituto:</p>
                          </div>
                      </div>
                            {/* <div className='border'> */}
                    <div className='row ms-1 me-1 border'>
                      <div className='col-11 pt-2' >
                        <p className=''>{this.state.selectedInstituteName}</p>
                      </div>
                      <div className='col-1 text-start'>
                        <button className='btn btn-light fs-4 p-0 m-0' onClick={this.toggleList}><i id="showListButton" className="bi bi-caret-down-square"></i></button>
                      </div>
                      <div className='col-12'>
                        <div id='tableInstitutes' className='table-wrapper-scroll-y' hidden>
                          <table className='table'>
                            <tbody>
                              <tr>
                                <td>
                                  <input type="search" className="form-control" id="txtInstituteSearch" placeholder="pesquisar" value={this.state.instituteSearchTerm} onChange={this.txtInstituteSearch_change} />
                                </td>
                                <td>
                                  <button className="btn btn-light" onClick={this.searchInstituteButtonClicked} id="searchInstituteButton"><i className="bi bi-search"></i></button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className='table table-hover table-sm table-responsive'>
                            <tbody>
                              { (this.state.institutes && this.state.institutes.length>0) ? (this.state.institutes.map((institute) => {
                                return <tr key={institute.id}>
                                  <td>{institute.name}</td>
                                  <td>
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkboxInstitute${institute.id}`}
                                        value={institute.id}
                                        onChange={() => this.instituteCheckboxChange(institute)}
                                        checked={institute.id === this.state.selectedInstituteId}
                                      />
                                  </td>
                                </tr>
                              })) : (
                                <tr>
                                  <td colSpan="4" className="text-center">Sem itens para exibir</td>
                                </tr>)}
                            </tbody>
                          </table>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" className="btn btn-primary" onClick={this.save}>Salvar</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
