import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import '../styles/Home.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

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

const options = {
  responsive: true,
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => [49, 50, 12, 14, 204, 135, 938]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => [21, 68, 321, 649, 94]),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const datapie = {
  labels: ['Artigos', 'Livros'],
  datasets: [
    {
      label: 'Quantidade',
      data: [12, 19],
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
}

export default class Home extends Component {

  state = {
    id: "",
    startDate: new Date(1980, 2, 5, 0, 0, 0),
    endDate: new Date(2024, 2, 5, 0, 0, 0),
    researchers: [],
    institutes: [],
    totalInstitutes: 0,
    totalResearchers: 0
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
  }

  componentDidMount () {
    this.getTotalCounts();  
  }

  render() {
    return (
      <div className='col-12 mt-5 mb-5 pt-3'>
        <div className="row">
          <div className="col-12">
            <h1>Pagina inicial</h1>
          </div>
        </div>
        <hr/>

        {/* Filtros de Data */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="searchDatePickerStartDate" className="form-label d-block">Data início</label>
            <ReactDatePicker id="searchDatePickerStartDate" className="form-control custom-date-picker" selected={this.state.startDate} onChange={this.searchDatePickerStartDateChange} dateFormat="yyyy" showYearPicker />
          </div>
          <div className="col-md-4">
            <label htmlFor="searchComboEndDate" className="form-label d-block">Data fim</label>
            <ReactDatePicker id="searchDatePickerEndDate" className="form-control custom-date-picker" selected={this.state.endDate} onChange={this.searchDatePickerEndDateChange} dateFormat="yyyy" showYearPicker />
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
                options={options}
                  data={data} >
              </Bar>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-3'>
          <div className='card text-center bg-secondary' style={{height: "200px"}}>
              <div className='card-body'>
                <h2 className='card-title'>Total Produção</h2>
                <p className='card-text align-items-center fw-bold' style={{"font-size": "5em"}}><Pie data={datapie} height={"120%"} options={{ maintainAspectRatio: false , plugins:{legend: {display: false}}}}/></p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary' style={{height: "200px"}}>
              <div className='card-body'>
                <h2 className='card-title'>Institutos</h2>
                <p className='card-text align-items-center fw-bold' style={{"font-size": "5em"}}>{this.state.totalInstitutes}</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary' style={{height: "200px"}}>
              <div className='card-body'>
                <h2 className='card-title'>Pesquisadores</h2>
                <p className='card-text align-items-center fw-bold' style={{"font-size": "5em"}}>{this.state.totalResearchers}</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='card text-center bg-secondary' style={{height: "200px"}}>
              <div className='card-body'>
                <h2 className='card-title mb-0 pb-0'>Grafos</h2>
                <p className='card-text mt-0 pt-0 d-flex justify-content-center align-items-center fw-bold' style={{"font-size": "6em"}}><i class="bi bi-bezier2"></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
