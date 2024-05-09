import React, { Component } from 'react';
import '../styles/ProductionItem.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class ItensProducao extends Component {
 
  state = {
		id: "",
    startDate: new Date(2000, 2, 5, 0, 0, 0),
    endDate:  new Date(2024, 2, 5, 0, 0, 0),
    institute: "all",
    researcher: "all",
    productionType: "all",
		productionItems: [],
		including: false,
		editing: false,
		currentPage: 0, 
		itensPerPage: 20,
		lastPage: 0
	}

  searchDatePickerStartDateChange = (date) => {	
		this.setState({startDate : date});
	}

  searchDatePickerEndDateChange = (date) => {	
		this.setState({endDate : date});
	}

  searchComboInstituteChange = (event) => {	
		this.setState({institute : event.target.options[event.target.selectedIndex].value});
	}

  searchComboResearcherChange = (event) => {	
		this.setState({researcher : event.target.options[event.target.selectedIndex].value});
	}

  searchComboProductionTypeChange = (event) => {	
		this.setState({productionType : event.target.options[event.target.selectedIndex].value});
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

  search = () => {
    const url = `${window.server}/work/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}&startYear=${this.state.startDate.getFullYear()}&endYear=${this.state.endDate.getFullYear()}&type=${this.state.productionType}`;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      this.state.lastPage = Number(json.totalPages) - 1;
      
      var data = {
        productionItems : json.content,
        pageable : json.pageable
      };
      return data
    })
    .then((data) =>  {
      this.setState({productionItems : data.productionItems});
      this.setState({currentPage: Number(data.pageable.pageNumber)});
    })
    .catch(e => {this.clearPagination()})
	}
	
	fillOrSearch = () => {
		if(this.state.searchTerm)
			this.search();
		else
			this.fillList();
	}

  clearState = () => {
		this.setState({id: ""});
		this.hideAlert('insertion-success-alert');
		this.hideAlert('insertion-error-alert');
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

  clearPagination = () => {
		this.state.currentPage=0;
		this.state.lastPage=0;
		this.state.limit=20;
	}

  searchButtonClicked = () => {
		this.clearPagination();
		this.search();
	}

  itensQuantityComboChange = (event) => {
		this.clearPagination();
		this.setState({itensPerPage : event.target.options[event.target.selectedIndex].value}, () => this.fillOrSearch());
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
        {/* <div className="row mt-4 search-bar ">
          <div className="col-10 mx-auto "> */}
            
        <div className="border rounded p-3 bg-light mb-3">
          <div className="row mb-4 justify-content-center">
            <div className="col-md-4">
              <label htmlFor="searchDatePickerStartDate" className="form-label">Data início</label>
              
              <DatePicker id="searchDatePickerStartDate" className="form-control" selected={this.state.startDate} onChange={this.searchDatePickerStartDateChange} dateFormat="yyyy"  showYearPicker/>
              {/*Mostra apenas o seletor de ano*/}
            </div>
            <div className="col-md-4">
              <label htmlFor="searchComboEndDate" className="form-label">Data fim</label>
              <DatePicker id="searchDatePickerEndDate" className="form-control" selected={this.state.endDate} onChange={this.searchDatePickerEndDateChange} dateFormat="yyyy"  showYearPicker/>
              {/* <select className="form-select" arial-label="Combo for search field" defaultValue="2024" id="searchComboEndDate" onChange={this.searchComboEndDateChange}>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2024">2024</option>
              </select> */}
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button type="button" className="btn btn-primary" onClick={this.searchButtonClicked} id="searchButton">Pesquisar</button>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-md-4">
              <label htmlFor="searchComboInstitute" className="form-label">Instituto</label>
              <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchComboInstitute" onChange={this.searchComboInstituteChange}>
                <option value="all">Todos</option>
              </select>
              </div>
            <div className="col-md-4">
              <label htmlFor="searchComboResearcher" className="form-label">Pesquisador</label>
              <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchComboResearcher" onChange={this.searchComboResearcherChange}>
                <option value="all">Todos</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="searchComboProductionType" className="form-label">Tipo Prod</label>
              <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchComboProductionType" onChange={this.searchComboProductionTypeChange}>
                <option value="all">Todos</option>
                <option value="article">Artigos pub.</option>
                <option value="book">Livros pub.</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col-9 mx-auto">
              {/* <button type="button" className="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#insertionModal" onClick={this.beginInsertion}><i className="bi bi-plus-circle-dotted fs-6 me-2"></i>Adicionar</button> */}
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
        </div>
      )
    }
}
