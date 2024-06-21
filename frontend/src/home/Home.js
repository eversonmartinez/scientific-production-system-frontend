import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import '../styles/Home.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const animatedComponents = makeAnimated();

// const options = {
//   responsive: true,
//   scales: {
//     yAxes: [{
//         ticks: {
//             beginAtZero: true
//         }
//     }]
//   },
//   plugins: {
//     legend: {
//       display: false
//     },
//     title: {
//       display: true,
//       text: 'Trabalhos',
//     },
//   },
// };
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Trabalhos produzidos',
//       data: labels.map(() => [49, 50, 12, 14, 204, 135, 938]),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     }
//   ],
// };

export default class Home extends Component {

  state = {
    id: "",
    startDate: new Date(1980, 2, 5, 0, 0, 0),
    endDate: new Date(2024, 2, 5, 0, 0, 0),
    researchers: [],
    institutes: [],
    totalInstitutes: 0,
    totalResearchers: 0,
    totalArticles: 0,
    totalBooks: 0,
    selectedInstitutes: [],
    selectedResearchers: [],
    labelsBar: []
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

  getTotalCounts = () => {
    let url = `${window.server}/institute/count`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ totalInstitutes: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar institutos:', error);
      });

    url = `${window.server}/researcher/count`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ totalResearchers: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar pesquisadores:', error);
      });

    url = `${window.server}/work/count?type=article`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ totalArticles: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar trabalhos:', error);
      });

    url = `${window.server}/work/count?type=book`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ totalBooks: data }); // Atualiza o estado com os dados dos institutos
      })
      .catch((error) => {
        console.error('Erro ao buscar trabalhos:', error);
      });
  }

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
          totalElements: json.totalElements
        };
        return data
      })
      .then((data) => {
        this.setState({ productionItems: data.productionItems });
        this.setState({ totalItens: data.totalElements});
      })
      .catch(e => { console.log(e) })
    
  }

  applyButtonClicked = () => {
    this.clearPagination();
    this.search();
  }

  setLabelsBar = () => {
    let labels = [];
    let startDate = this.state.startDate;
    const endDate = this.state.endDate;
    while(startDate <= endDate){
      labels.push(startDate.getFullYear());
      startDate.setFullYear(startDate.getFullYear() + 1)
    }
    this.setState({labelsBar: labels})
  }

  componentDidMount () {
    this.getTotalCounts();  
    this.fillInstitutesCombo();
    this.fillResearchersCombo();
    this.setLabelsBar();
  }

  render() {

    const datapie = {
      labels: ['Artigos', 'Livros'],
      datasets: [
        {
          label: 'Quantidade',
          data: [this.state.totalArticles, this.state.totalBooks],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

  //const labelsBar = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const dataBar = {
  datasets: [
    {
      label: 'Trabalhos produzidos',
      data: this.state.labelsBar.map(() => [49, 50, 12, 14, 204, 135, 938]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

    return (
      <div className='col-12 mt-5 mb-5 pt-3'>
        <div className="row">
          <div className="col-12">
            <h1>Pagina inicial</h1>
          </div>
        </div>
        <hr/>

        {/* Filtros de Data */}
        <div className="row mb-3 ">
          <div className="col-md-4">
            <label htmlFor="searchDatePickerStartDate" className="form-label d-block">Data início</label>
            <DatePicker id="searchDatePickerStartDate" className="form-control custom-date-picker" selected={this.state.startDate} onChange={this.searchDatePickerStartDateChange} dateFormat="yyyy" showYearPicker />
          </div>
          <div className="col-md-4">
            <label htmlFor="searchComboEndDate" className="form-label d-block">Data fim</label>
            <DatePicker id="searchDatePickerEndDate" className="form-control custom-date-picker" selected={this.state.endDate} onChange={this.searchDatePickerEndDateChange} dateFormat="yyyy" showYearPicker />
          </div>
          <div className="col-md-4 ">
            <button type="button" className="btn btn-primary mt-4 w-50 fw-bold border border-info shadow">Aplicar</button>
          </div>
        </div>

        {/* Seleção de Unidade, Pesquisador e Tipo de Produção */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="searchComboInstitute" className="form-label">Instituto</label>
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
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoProducao" className="form-label">Tipo de Produção</label>
            <select className="form-select" id="tipoProducao" defaultValue="all" onChange={this.searchComboProductionTypeChange}>
              <option value="all">Todos</option>
              <option value="article">Artigos publicados</option>
              <option value="book">Livros publicados</option>
            </select>
          </div>
        </div>

        {/* Gráfico Dinâmico */}
        <div className="row mb-5">
          <div className="col d-flex justify-content-center">
            <div className='border border-secondary  w-75' style={{height: "600px"}}>
              <Bar
                options={{
                  responsive: true, 
                  
                  plugins: {legend: {display: false},title: {display: true,text: 'Trabalhos'},},
                }}
                data={dataBar} >
              </Bar>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-3'>
          <div className='card text-center bg-secondary bg-gradient' style={{height: "200px"}}>
              <div className='card-body'>
                <h2 className='card-title'>Total Produção</h2>
                <p className='card-text fw-bold' style={{fontSize: "5em"}}><Pie data={datapie} height={"120%"} options={{ maintainAspectRatio: false , plugins:{legend: {display: false}}}}/></p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary bg-gradient link-cards' style={{height: "200px"}}>
              <div className='card-body'>
                <Link to="/instituto" className='nav-link'>
                  <h2 className='card-title'>Institutos</h2>
                  <p className='card-text fw-bold' style={{fontSize: "5em"}}>{this.state.totalInstitutes}</p>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary bg-gradient link-cards' style={{height: "200px"}}>
              <div className='card-body'>
                <Link to="/pesquisador" className='nav-link'>
                  <h2 className='card-title'>Pesquisadores</h2>
                  <p className='card-text fw-bold' style={{fontSize: "5em"}}>{this.state.totalResearchers}</p>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary bg-gradient link-cards' style={{height: "200px"}}>
              <div className='card-body '>
                <Link to="/geradorGrafo" className='nav-link'>
                  <h2 className='card-title mb-0 pb-0'>Grafos</h2>
                  <p className='card-text mt-0 fw-bold' style={{fontSize: "6em"}}><i className="bi bi-bezier2"></i></p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
