import React, { Component } from 'react';
import '../styles/Researcher.css';

export default class Pesquisador extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    selectedInstituteId: '',
    selectedInstituteName: '',
    researchers: [],
    institutes: [],
    including: false,
    editing: false,
    selectedResearchersId: [],
    searchTerm: "",
    field: "all",
    currentPage: 0,
    itensPerPage: 20,
    lastPage: 0,
    displayedItens: 0,
    totalItens: 0,
    instituteSearchTerm: ''
  }

  txtId_change = (event) => {
    this.setState({ id: event.target.value })
  }

  // Função para atualizar o estado do nome
  txtName_change = (event) => {
    this.setState({ name: event.target.value })
  }

  // Função para atualizar o estado do email
  txtEmail_change = (event) => {
    this.setState({ email: event.target.value })
  }

  // Função para manipular a seleção/deseleção de pesquisadores
  researcherCheckboxChange = (id) => {
    // Cria uma cópia do array selectedResearchersId
    const selectedIds = (this.state.selectedResearchersId) ? this.state.selectedResearchersId.slice() : null;

    // Se o array for vazio ou null, adiciona o id ao array
    if (!selectedIds || selectedIds.length === 0) {
      this.setState({ selectedResearchersId: [id] });
    } else if (selectedIds.includes(id)) {
      // Se o id estiver presente (foi selecionado), remove-o do array
      this.setState({ selectedResearchersId: selectedIds.filter(item => item !== id) });
    } else {
      // Se o id não estiver no array, adiciona-o
      selectedIds.push(id);
      this.setState({ selectedResearchersId: selectedIds })
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
    this.setState({ selectedInstituteId: institute.id, selectedInstituteName: institute.name });
  }

  searchComboChange = (event) => {
    this.setState({ field: event.target.options[event.target.selectedIndex].value });
  }

  txtSearch_change = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  txtInstituteSearch_change = (event) => {
    this.setState({ instituteSearchTerm: event.target.value })
  }


  // Função simples criada para traduzir as mensagens do banco. Não possui nenhuma inteligência, as mensagens conhecidas devem 
  // ser inseridas no switch e sua tradução equivalente ser retornada.
  translateBackendMessages = (message) => {
    switch (message) {
      case "This curriculum ID doesn't exist!":
        return "Esse ID de curriculum não existe!";
      case "This researcher ID already exists!":
        return "Esse ID de Pesquisador já existe!";
      case "This researcher ID is already registered on the system!":
        return "Esse ID de pesquisador já está cadastrado no sistema!";
      default:
        return message;
    }
  }

  // Função para preencher a lista de pesquisadores
  fillList = () => {
    const url = `${window.server}/researcher/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ lastPage: Number(json.totalPages) - 1});

        var data = {
          researchers: json.content,
          pageable: json.pageable,
          totalElements: json.totalElements,
          numberOfElements: json.numberOfElements
        };
        return data
      })
      .then((data) => {
        this.setState({ researchers: data.researchers });
        this.setState({ currentPage: Number(data.pageable.pageNumber) });
        this.setState({ currentOffset: Number(data.pageable.offset)});
        this.setState({ totalItens: data.totalElements, displayedItens: data.numberOfElements });
      })
      .catch(e => { this.clearPagination() })
  }

  search = () => {
    if (this.state.searchTerm) {
      const url = `${window.server}/researcher/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}&field=${this.state.field}&term=${this.state.searchTerm}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ lastPage: Number(json.totalPages) - 1});

          var data = {
            researchers: json.content,
            pageable: json.pageable,
            totalElements: json.totalElements,
            numberOfElements: json.numberOfElements
          };
          return data
        })
        .then((data) => {
          this.setState({ researchers: data.researchers });
          this.setState({ currentPage: Number(data.pageable.pageNumber) });
          this.setState({ currentOffset: Number(data.pageable.offset)});
          this.setState({ totalItens: data.totalElements, displayedItens: data.numberOfElements });
        })
        .catch(e => { this.clearPagination() })

    }
    else {
      this.fillList();
    }
  }

  instituteSearch = () => {
    if (this.state.instituteSearchTerm) {
      const url = `${window.server}/institute/search?page=0&limit=15&field=name&term=${this.state.instituteSearchTerm}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => json.content)
        .then((data) => {
          this.setState({ institutes: data });
        })
        .catch(e => { console.log(e) })

    }
    else {
      this.fillInstitutesList();
    }
  }

  fillOrSearch = () => {
    if (this.state.searchTerm)
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
    if (this.state.currentPage !== 0) {
      this.setState({ currentPage: 0});
      this.fillOrSearch();
    }
  }

  goToPreviousPage = () => {
    if (this.state.currentPage > 0) {
      this.setState({currentPage: this.state.currentPage-1});
      this.fillOrSearch();
    }

  }

  goToNextPage = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage+1});
      this.fillOrSearch();
    }

  }

  goToLastPage = () => {
    if (this.state.currentPage !== this.state.lastPage) {
      this.setState({currentPage:  this.state.lastPage});
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
    this.setState({ id: '', name: '', email: '', selectedInstituteId: '', selectedInstituteName: '' });
    // Escondendo alertas
    this.hideAlert('insertion-success-alert');
    this.hideAlert('insertion-error-alert');
  }

  clearPagination = () => {
    this.setState({currentPage: 0});
    this.setState({lastPage: 0});
    this.setState({limit: 20});
  }

  itensQuantityComboChange = (event) => {
    this.clearPagination();
    this.setState({ itensPerPage: event.target.options[event.target.selectedIndex].value }, () => this.fillOrSearch());
  }

  beginInsertion = () => {
    this.clearState();
    document.getElementById("insertionModalTitle").textContent = "Acrescentar pesquisador";
    document.getElementById("labelNewIdInput").textContent = "Informe um novo ID:";
    document.getElementById("newIdInput").readOnly = false;
    this.setState({ including: true })
  }

  beginEdit = (researcher) => {
    this.clearState();
    document.getElementById("insertionModalTitle").textContent = "Editar pesquisador";
    document.getElementById("labelNewIdInput").textContent = "ID:";
    document.getElementById("newIdInput").readOnly = true;
    this.setState({ editing: true, id: researcher.id, name: researcher.name, email: researcher.email, selectedInstituteId: researcher.institute.id, selectedInstituteName: researcher.institute.name });
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
    if (alert) {
      alert.querySelector('.alert-message').textContent = message;
      alert.removeAttribute("hidden");
    }
  }

  toggleList = () => {
    var list = document.getElementById('tableInstitutes');
    var icon = document.getElementById('showListButton');

    if (list.hidden) {
      list.hidden = false;
      icon.classList.remove('bi-caret-down-square');
      icon.classList.add('bi-caret-up-square');
    }
    else {
      list.hidden = true;
      icon.classList.remove('bi-caret-up-square');
      icon.classList.add('bi-caret-down-square');
    }
  }

  save = () => {
    if (!this.state.id) {
      this.showAlertWithMessage('insertion-error-alert', "Um ID de pesquisador deve ser informado!");
      return;
    }
    if (!this.state.selectedInstituteId) {
      this.showAlertWithMessage('insertion-error-alert', "Um instituto deve ser selecionado!");
      return;
    }

    var url = window.server + '/researcher';
    let requestOptions;

    fetch(url + '/curriculum/' + this.state.id)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((responseData) => {
              //Os seguintes comentários servem para que o javascript consiga criar a janela de confirmação, não os remova.
              /* eslint-disable */
              if (confirm("Deseja mesmo incluir o Lattes " + responseData.id + " de " + responseData.name + " na " + this.state.selectedInstituteName + "?")) {
                /* eslint-enable */
                var selectedInstitute = this.state.institutes.find((i) => i.id === this.state.selectedInstituteId);

                let data = {
                  "id": responseData.id,
                  "name": responseData.name,
                  "email": responseData.email,
                  "institute": selectedInstitute
                };

                if (this.state.including) {
                  requestOptions = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  };
                }

                else if (this.state.editing) {
                  requestOptions = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  };
                }

                fetch(url, requestOptions)
                  .then((response) => {
                    if (response.ok) {
                      document.getElementById('btnCloseModal').click();
                      this.clearState();
                      this.clearPagination();
                      this.showAlert('insertion-success-alert');
                      this.setState({ including: false, editing: false });
                      setTimeout(() => this.hideAlert('insertion-success-alert'), 5000);
                    }
                    else {
                      response.json().then((data) => data.message).then((text) => this.showAlertWithMessage('insertion-error-alert', this.translateBackendMessages(text)));
                    }
                  })
                  .then(() => this.fillList())
                  .catch(error => this.showAlertWithMessage('insertion-error-alert', this.translateBackendMessages(error)));
              }
            }
            )
        }
        else {
          response.json().then((data) => data.message).then((text) => this.showAlertWithMessage('insertion-error-alert', this.translateBackendMessages(text)));
        }
      })
      .catch(error => this.showAlertWithMessage('insertion-error-alert', this.translateBackendMessages(error)));
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
    if (Array.isArray(researchers)) {
      if (confirm("Deseja excluir selecionado(s)?"))
        researchers.forEach((r) => this.delete(r));
    }
    else {
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
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <br></br>
            <h1>Pesquisadores</h1>
          </div>
        </div>
        <hr />
        <div className="alert alert-success col-2 text-center position-fixed end-0 top-0 mt-5" role="alert" id="insertion-success-alert" hidden>
          <i className="bi bi-check2-circle fs-4"></i> Gravado com sucesso!
        </div>
        {/* Retângulo com bordas */}
        <div className="border rounded p-3 bg-light mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="term" className="form-label">Termo</label>
              <input type="search" className="form-control" id="term" placeholder="Pesquisador" onChange={this.txtSearch_change} onKeyUp={(e) => this.clickWithEnter(e, 'searchButton')} />
            </div>
            <div className="col-md-3">
              <label htmlFor="searchField" className="form-label">Campo</label>
              <select className="form-select" id="searchField" defaultValue="all" onChange={this.searchComboChange}>
                <option value="all">Todos</option>
                <option value="name">Nome</option>
                <option value="email">E-mail</option>
                <option value="institute">Intituto</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="button" className="btn btn-primary" onClick={this.searchButtonClicked} id="searchButton">Pesquisar</button>
            </div>
          </div>
        </div>

        <table className="table text-white">
          <thead>
            <tr className="text-center table-dark">
              <th scope='col'></th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Instituto</th>
              <th scope='col'>Funções</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {(this.state.researchers && this.state.researchers.length > 0) ? (this.state.researchers.map(researcher => {
              return <tr key={researcher.id}>
                <td className='text-center'>
                  <input className="form-check-input" type="checkbox" checked={this.researcherCheckboxChecked(researcher)} onChange={() => this.researcherCheckboxChange(researcher.id)} />
                </td>
                <td>{researcher.name}</td>
                <td className="text-center">{researcher.email}</td>
                <td className="test-center">{researcher.institute.name}</td>
                <td className="text-center">
                  {/* Botão removido pois o professor informou que essa edição era desnecessária */}
                  {/* <button className="btn btn-primary me-1" data-toggle="tooltip" data-placement="top" title="Editar Instituto" onClick={() => this.beginEdit(researcher)} data-bs-toggle="modal" data-bs-target="#insertionModal"><i className="bi bi-pencil"></i></button> */}
                  <button className="btn btn-primary mw-1" data-toggle="tooltip" data-placement="top" title="Excluir selecionado" onClick={() => this.beginDeletion(researcher)}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            })) : (
              <tr>
                <td colSpan="5" className="text-center">Sem itens para exibir</td>
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
            <p className='d-inline ps-2 pe-2 fs-6 align-middle'>{this.state.currentPage + 1}</p>
            <button onClick={this.goToNextPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-right"></i></button>
            <button onClick={this.goToLastPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-right"></i></button>
          </div>
          <div className='row'>
            <div className='col-12 text-end'>
              <p className='fw-lighter font-small d-inline'>{(this.state.researchers && this.state.researchers.length > 0) ? ('Exibindo itens ' + (Number(this.state.currentOffset)+Number(1)) + ' ao ' + (Number(this.state.currentOffset)+Number(this.state.displayedItens)) + ' de um total de ' + this.state.totalItens) :  ('Não há itens')}</p>
            </div>
          </div>
        </div>


        {/* Botões de incluir e excluir */}
        <div className="row text-center">
          <div className="col-md-6">
            <button type="button" className="btn btn-success w-50" data-bs-toggle="modal" data-bs-target="#insertionModal" onClick={this.beginInsertion}><i className="bi bi-file-earmark-plus fs-6 me-2"></i>Incluir</button>
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
                  <hr />
                  <p className='mb-0 alert-message'></p>
                </div>
                <div className='row mt-2'>
                  <div className='col-12'>
                    <label htmlFor="newIdInput" className="form-label" id="labelNewIdInput">Informe um novo ID:</label>
                    <input id="newIdInput" value={this.state.id} onChange={this.txtId_change} className='form-control' type='text' aria-label='Informe um novo ID'></input>
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
                          {(this.state.institutes && this.state.institutes.length > 0) ? (this.state.institutes.map((institute) => {
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
