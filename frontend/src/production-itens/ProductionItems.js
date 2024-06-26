import React, { Component } from 'react';
import '../styles/ProductionItem.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { withLocation } from '../HOC/withLocation';

const animatedComponents = makeAnimated();

class ItensProducao extends Component {

  state = {
    id: "",
    startDate: new Date(2000, 2, 5, 0, 0, 0),
    endDate: new Date(2024, 2, 5, 0, 0, 0),
    selectedInstituteName: "all",
    researcher: "all",
    productionType: "all",
    productionItems: [],
    institutes: [],
    selectedInstituteId: "all",
    researchers: [],
    selectedResearcherId: "all",
    including: false,
    editing: false,
    currentPage: 0,
    currentOffset: 0,
    itensPerPage: 20,
    lastPage: 0,
    displayedItens: 0,
    totalItens: 0,
    selectedInstitutes: [],
    selectedResearchers: []
  }

  destacarOpcaoTodos  = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.value === 'all' ? '#FFD700' : provided.backgroundColor,
        color: state.data.value === 'all' ? 'black' : provided.color,
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.value === 'all' ? '#FFD700' : provided.backgroundColor,
        color: state.data.value === 'all' ? 'black' : provided.color,
    }),
  };

  searchDatePickerStartDateChange = (date) => {
    this.setState({ startDate: date });
  }

  searchDatePickerEndDateChange = (date) => {
    this.setState({ endDate: date });
  }

  filterResearchersCombo = (institutes) => {
    const filteredResearchers = this.state.researchers.filter((researcher) => institutes.includes(researcher.institute.id));
    const filteredSelectedResearchers = this.state.selectedResearchers.filter((researcher) => researcher.value==="all"||institutes.includes(this.getCompleteSelectedResearcher(researcher).institute.id)?true: false);
    this.setState({researchers: filteredResearchers, selectedResearchers: filteredSelectedResearchers});
  }

  searchComboInstituteChange = async (selectedOptions) => {
    //this.setState({ selectedInstituteId: event.target.options[event.target.selectedIndex].value });
    // this.setState({selectedInstituteName : event.target.options[event.target.selectedIndex].});

    const selectedValues = selectedOptions.map(option => option.value);

    if (selectedValues.includes('all')) {
    // Se "Todos" estiver selecionado, somente ele deve permanecer selecionado
        this.setState({ selectedInstitutes: [{ value: 'all', label: 'Todos' }] });
    } else {
    // Caso contrário, remover "Todos" da seleção
        this.setState({ selectedInstitutes: selectedOptions.filter(option => option.value !== 'all') });
    }

    await this.fillResearchersCombo();


    if(selectedValues.length>0 && !selectedValues.includes('all'))
      this.filterResearchersCombo(selectedValues);
  }

  searchComboResearcherChange = (selectedOptions) => {

    const selectedValues = selectedOptions.map(option => option.value);

    if (selectedValues.includes('all')) {
    // Se "Todos" estiver selecionado, somente ele deve permanecer selecionado
        this.setState({ selectedResearchers: [{ value: 'all', label: 'Todos' }] });
    } else {
    // Caso contrário, remover "Todos" da seleção
        this.setState({ selectedResearchers: selectedOptions.filter(option => option.value !== 'all') });
    }
  }

  searchComboProductionTypeChange = (event) => {
    this.setState({ productionType: event.target.options[event.target.selectedIndex].value });
  }

  productionItemsCheckboxChange = (id) => {
    const selectedIds = this.state.selectedProductionItemsId.slice();


    if (!selectedIds || selectedIds.length === 0) {
      this.setState({ selectedProductionItemsId: [id] });
    }
    else if (selectedIds.includes(id)) {
      this.setState({ selectedProductionItemsId: selectedIds.filter(item => item !== id) });
    }
    else {
      selectedIds.push(id)
      this.setState({ selectedProductionItemsId: selectedIds });
    }
  }

  productionItemsCheckboxChecked = (productionItem) => {
    if (this.state.selectedProductionItemsId)
      return this.state.selectedProductionItemsId.includes(productionItem.id);
    else
      return false;
  }

  fillList = () => {

    let requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const url = `${window.server}/work/search?page=${this.state.currentPage}&limit=100`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ lastPage: Number(json.totalPages) - 1});
        var data = {
          productionItems: json.content,
          pageable: json.pageable,
          totalElements: json.totalElements,
          numberOfElements: json.numberOfElements
        };
        return data
      })
      .then((data) => {
        this.setState({ productionItems: data.productionItems });
        this.setState({ currentPage: Number(data.pageable.pageNumber) });
        this.setState({ currentOffset: Number(data.pageable.offset)});
        this.setState({ totalItens: data.totalElements, displayedItens: Number(data.numberOfElements) });
      })
      .catch(e => { this.clearPagination() })
  }

  getCompleteSelectedResearcher = (selectedResearcher) => {
    return this.state.researchers.find((researcher) => researcher.id === selectedResearcher.value)
  }

  fillInstitutesCombo = () => {
    const url = `${window.server}/institute`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ institutes: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar institutos:', error);
      });
  }

  fillResearchersCombo = async () => {
    const url = `${window.server}/researcher`;
    return new Promise ((resolve) => {
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ researchers: data }, resolve);
      })
    })
  }

  search = () => {
    let url = `${window.server}/work/search?page=${this.state.currentPage}&limit=${this.state.itensPerPage}&startYear=${this.state.startDate.getFullYear()}&endYear=${this.state.endDate.getFullYear()}&type=${this.state.productionType}`;

    // if (this.state.selectedInstituteId !== "all" && this.state.selectedInstituteId !== null) {
    //   url += `&idInstitute=${this.state.selectedInstituteId}`
    // }
    // if (this.state.selectedResearcherId !== "all" && this.state.selectedResearcherId !== null) {
    //   url += `&idResearcher=${this.state.selectedResearcherId}`
    // }

    let data;

    let selectedInstitutes = this.state.selectedInstitutes.map((selected) => selected.value?selected.value:selected)
    let selectedResearchers = this.state.selectedResearchers.map((selected) => selected.value?selected.value:selected)

    //Se não tiverem nem institutos nem pesquisadores selecionados, entende-se que a seleção será de todos. Por isso, não entrará em nenhuma condição de filtro abaixo
    if(selectedInstitutes.length > 0 || selectedResearchers.length > 0){
      
        //Se os dois estiverem marcados para selecionar todos, não é necessário entrar em condição também
        if(!(selectedInstitutes.includes("all") && selectedResearchers.includes("all"))){

            //Aqui elimina-se as combinações [all com vazio] e [vazio com all], que seriam equivalentes a selecionar todos.
            if(!(selectedInstitutes.includes("all") && !selectedResearchers.length > 0) && !(!selectedInstitutes.length>0 && selectedResearchers.includes("all"))){

                //Se os pesquisadores não estiverem marcados como "todos" e tiverem alguma seleção eles entrão nessa condição
                if(!selectedResearchers.includes("all") && selectedResearchers.length>0){
                    data = selectedResearchers
                      ;
                }

                //Se os institutos não estiverem marcados como todos ao mesmo tempo que os pesquisadores estão vazio, a condição será a seguinte:
                else if(!selectedInstitutes.includes("all") && selectedInstitutes.length>0){
                    data = this.state.researchers.filter((researcher) => selectedInstitutes.includes(researcher.institute.id)).map((researcher) => researcher.id)
                    ;
                }

            }
        }
    }

    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(data)
      requestOptions.body=JSON.stringify(data);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({lastPage: Number(json.totalPages) - 1});
        var data = {
          productionItems: json.content,
          pageable: json.pageable,
          totalElements: json.totalElements,
          numberOfElements: json.numberOfElements
        };
        return data
      })
      .then((data) => {
        this.setState({ productionItems: data.productionItems });
        this.setState({ currentPage: Number(data.pageable.pageNumber) });
        this.setState({ currentOffset: Number(data.pageable.offset)});
        this.setState({ totalItens: data.totalElements, displayedItens: Number(data.numberOfElements) });
      })
      .catch(e => { this.clearPagination() })
    
  }

  clearState = () => {
    this.setState({ id: "" });
    this.hideAlert('insertion-success-alert');
    this.hideAlert('insertion-error-alert');
  }

  //Métodos para navegar entre as páginas da lista exibida
  goToFirstPage = () => {
    if (this.state.currentPage !== 0) {
      this.setState({ currentPage: 0}, this.search);
    }
  }

  goToPreviousPage = () => {
    if (this.state.currentPage > 0) {
      const goToPage = this.state.currentPage--;
      this.setState({currentPage: goToPage});
      this.search();
    }

  }

  goToNextPage = () => {
    if (this.state.currentPage < this.state.lastPage) {
      const goToPage = this.state.currentPage++;
      this.setState({currentPage: goToPage});
      this.search();
    }

  }

  goToLastPage = () => {
    if (this.state.currentPage !== this.state.lastPage) {
      this.setState({currentPage: this.state.lastPage}, this.search);
    }
  }
  //Fim

  clearPagination = () => {
    this.setState({currentPage: 0});
    this.setState({currentOffset: 0});
    this.setState({lastPage: 0});
    this.setState({limit: 20});
  }

  searchButtonClicked = () => {
    this.clearPagination();
    this.search();
  }

  itensQuantityComboChange = (event) => {
    this.clearPagination();
    this.setState({ itensPerPage: event.target.options[event.target.selectedIndex].value }, () => this.search());
  }

  updateStateFromComing = async(newState) => {
    let updated = false;

    if(newState.selectedResearchers){
      this.setState({ selectedResearchers: newState.selectedResearchers });
      updated = true;
    }
    if(newState.selectedInstitutes){
      this.setState({ selectedInstitutes: newState.selectedInstitutes });
      updated = true;
    }
    if(newState.productionType){
      this.setState({ productionType: newState.productionType});
      updated = true;
    }
    if(newState.year){
      this.setState({ startDate: new Date(newState.year, 0, 1), endDate: new Date(newState.year, 11, 30)});
      updated = true;
    }

    return updated;
  }

  componentDidMount() {    
    this.fillInstitutesCombo();
    this.fillResearchersCombo();
    const location = this.props.location;
    
    if(location.state){
      const end = this.updateStateFromComing(location.state).then(
        (result) => {
          if (result) { 
            this.search(); 
            return result;
          }
        }
      );

      if(end)
        return;
    }

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
          <hr />
          <p className='mb-0 alert-message'></p>
        </div>
        {/* <div className="row mt-4 search-bar ">
          <div className="col-10 mx-auto "> */}

        <div className="border rounded p-3 bg-light mb-3">
          <div className="row mb-4 justify-content-center">
            <div className="col-md-4">
              <label htmlFor="searchDatePickerStartDate" className="form-label">Data início</label>

              <DatePicker id="searchDatePickerStartDate" className="form-control" selected={this.state.startDate} onChange={this.searchDatePickerStartDateChange} dateFormat="yyyy" showYearPicker />
              {/*Mostra apenas o seletor de ano*/}
            </div>
            <div className="col-md-4">
              <label htmlFor="searchComboEndDate" className="form-label">Data fim</label>
              <DatePicker id="searchDatePickerEndDate" className="form-control" selected={this.state.endDate} onChange={this.searchDatePickerEndDateChange} dateFormat="yyyy" showYearPicker />
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
              {/* <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchComboInstitute" onChange={this.searchComboInstituteChange}>
                <option value="all">Todos</option>
                {(this.state.institutes && this.state.institutes.length > 0) &&
                  (this.state.institutes.map((institute) => {
                    return <option key={institute.id} value={institute.id}>{institute.name}
                    </option>
                  }))}
              </select> */}
              <Select id="searchComboInstitute" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                options={[{ value: 'all', label: 'Todos' }, ...this.state.institutes.length>0 ? this.state.institutes.map(institute => ({value: institute.id, label: institute.name})) : []]}
                value={this.state.selectedInstitutes} onChange={this.searchComboInstituteChange}
                placeholder="Selecione institutos..." styles={this.destacarOpcaoTodos}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="searchComboResearcher" className="form-label">Pesquisador</label>
              <Select id="searchComboResearcher" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                  options={[{ value: 'all', label: 'Todos' }, ...this.state.researchers.length>0? this.state.researchers.map(researcher => ({value: researcher.id, label: researcher.name})) : []]}
                  value={this.state.selectedResearchers} onChange={this.searchComboResearcherChange}
                  placeholder="Selecione pesquisadores..." styles={this.destacarOpcaoTodos}
              />
              {/* <select className="form-select" arial-label="Combo for search field" defaultValue="all" id="searchComboResearcher" onChange={this.searchComboResearcherChange}>
                <option value="all">Todos</option>
                {(this.state.researchers && this.state.researchers.length > 0) &&
                  (this.state.researchers.map((researcher) => {
                    return <option key={researcher.id} value={researcher.id}>{researcher.name}
                    </option>
                  }))}
              </select> */}
            </div>
            <div className="col-md-4">
              <label htmlFor="searchComboProductionType" className="form-label">Tipo Prod</label>
              <select className="form-select" arial-label="Combo for search field" id="searchComboProductionType" onChange={this.searchComboProductionTypeChange} value={this.state.productionType}>
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
                {(this.state.productionItems && this.state.productionItems.length > 0) ? (this.state.productionItems.map(productionItem => {
                  return <tr key={productionItem.id}>
                    <td className='text-center'>
                      <input className="form-check-input" type="checkbox" checked={this.productionItemsCheckboxChecked(productionItem)} onChange={() => this.productionItemsCheckboxChange(productionItem.id)} />
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
                <p className='d-inline ps-2 pe-2 fs-6 align-middle'>{this.state.currentPage + 1}</p>
                <button onClick={this.goToNextPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-right"></i></button>
                <button onClick={this.goToLastPage} className='btn btn-light ps-1 pe-1'><i className="bi bi-chevron-double-right"></i></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 text-end'>
                <p className='fw-lighter font-small d-inline'>{(this.state.productionItems && this.state.productionItems.length > 0) ? ('Exibindo itens ' + (Number(this.state.currentOffset)+Number(1)) + ' ao ' + (Number(this.state.currentOffset)+Number(this.state.displayedItens)) + ' de um total de ' + this.state.totalItens) :  ('Não há itens')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withLocation(ItensProducao);