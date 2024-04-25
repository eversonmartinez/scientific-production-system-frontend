import React, { Component } from 'react';
import '../styles/ProductionItem.css';

export default class ItensProducao extends Component {
 
  state = {
		id: "",
		productionItems: [],
		including: false,
		editing: false,
		selectedProductionItemsId: [],
		searchTerm: "",
		field: "all",
		currentPage: 0, 
		itensPerPage: 20,
		lastPage: 0
	}

  
  txtSearch_change = (event) => {
		this.setState({searchTerm: event.target.value})
	}

  searchComboChange = (event) => {	
		this.setState({field : event.target.options[event.target.selectedIndex].value});
	}

  itensQuantityComboChange = (event) => {
		this.clearPagination();
		this.setState({itensPerPage : event.target.options[event.target.selectedIndex].value}, () => this.fillList());
	}

  productionItemsCheckboxChange = (id) => {
		const selectedIds = this.state.selectedProductionItemsId.slice();

		
		if (!selectedIds || selectedIds.length===0){
			this.setState({selectedProductionItemsId : [ id ]});
		}
		else if (selectedIds.includes(id)){
			this.setState({selectedProductionItemsId : selectedIds.filter(item => item !== id)});
		}
		else{
			selectedIds.push(id)
			this.setState({selectedProductionItemsId : selectedIds});
		}
	}
  
  productionItemsCheckboxChecked = (productionItem) => {
		if (this.state.selectedProductionItemsId)
			return this.state.selectedProductionItemsId.includes(productionItem.id);
		else
			return false;
	}

  fillList = () => {
		const url = `${window.server}/work`;
		fetch(url)
		.then((response) => response.json())
		.then((data) =>  {
			this.setState({productionItems : data});
		})
		.catch(e => {this.clearPagination()})
	}

  clearState = () => {
		this.setState({id: ""});
		this.hideAlert('insertion-success-alert');
		this.hideAlert('insertion-error-alert');
	}

  componentDidMount() {
		this.fillList();
	}

  render() {
    return (    
      <div className='col-12 mt-5 mb-5 pt-3'>
        <div className="row">
          <div className="col-12">
              <h1>Itens de Produção</h1>
          </div>
        </div>
        <hr />
        <div className="alert alert-success col-2 text-center position-fixed end-0 top-0 mt-5" role="alert" id="insertion-success-alert" hidden>
          <i className="bi bi-check2-circle fs-4"></i> Gravado com sucesso!
        </div>
        <div className="alert alert-danger col-2 text-center position-fixed end-0 top-0 mt-5" role="alert" id="error-alert" hidden>
          <p><i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>Erro ao gravar</p>
          <hr/>
          <p className='mb-0 alert-message'></p>
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
                        <input type="search" className="form-control" id="txtSearch" placeholder="Artigo X" value={this.state.searchTerm} onChange={this.txtSearch_change} onKeyUp={() => console.log('click')}/>
                    </th>
                    <th className="w-5 text-center">
                        <label htmlFor="searchCombo" className="form-label">Campo:</label>
                    </th>
                    <th className="w-20">
                      <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchCombo" onChange={this.searchComboChange}>
                        <option value="all">Todos</option>
                      </select>
                    </th>
                    <th className="w-35 text-center">
                      <button type="button" className="btn btn-primary" onClick={() => console.log("click")} id="searchButton">Pesquisar</button>
                    </th>
                  </tr>
                <tr>
                  <th className="w-5 text-center">
                        <label htmlFor="searchCombo" className="form-label">Instituto</label>
                    </th>
                    <th className='w-25 text-center'>
                      <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchCombo" onChange={this.searchComboChange}>
                        <option value="all">Instituto 1</option>
                      </select>
                    </th>
                    <th className="w-'10' text-center">
                        <label htmlFor="searchCombo" className="form-label">Pesquisador</label>
                    </th>
                    <th className='w-25 text-center'>
                      <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchCombo" onChange={this.searchComboChange}>
                        <option value="all">Todos</option>
                      </select>
                    </th>
                    <th className="w-10 text-center">
                        <label htmlFor="searchCombo" className="form-label">Tipos prod</label>
                    </th>
                    <th className='w-25 text-center'>
                      <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchCombo" onChange={this.searchComboChange}>
                        <option value="articles">Artigos pub.</option>
                        <option value="books">LIvros pub.</option>
                      </select>
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
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Detalhamento</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  { (this.state.productionItems && this.state.productionItems.length>0) ? (this.state.productionItems.map( productionItem => {
                    return <tr key={productionItem.id}>
                      <td className='text-center'>
                        <input className="form-check-input"  type="checkbox" checked={this.productionItemsCheckboxChecked(productionItem)} onChange={() => this.productionItemsCheckboxChange(productionItem.id)}/>
                      </td>
                      <td className='text-center'>{productionItem.type}</td>
                      <td className="text-center">{productionItem.details}</td>
                      {/* <td className="text-center">
                          <button className="btn btn-primary me-1" data-toggle="tooltip" data-placement="top" title="Editar Instituto" onClick={() => this.beginEdit(productionItem)} data-bs-toggle="modal" data-bs-target="#insertionModal"><i className="bi bi-pencil"></i></button>
                          <button className="btn btn-primary mw-1" data-toggle="tooltip" data-placement="top" title="Excluir selecionado" onClick={() => this.beginDeletion(productionItem)}><i className="bi bi-trash"></i></button>
                      </td> */}
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
                <div className='col-7 text-center '>
                  <button className="btn btn-danger m-1" onClick={() => this.beginDeletion(this.state.selectedProductionItemsId)}>Excluir seleção</button>
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
        {/* <div className="modal fade" id="insertionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="insertionModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="insertionModalTitle">Acrescentar item de produção</h5>
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
          </div> */}
        </div>
      )
    }
}
