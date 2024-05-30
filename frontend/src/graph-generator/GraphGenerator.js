import React, { Component } from 'react';

export default class GraphGenerator extends Component {

    state = {
        institutes: [],
        selectedInstitute: '',
        researchers: [],
        selectedResearcher: '',
        productionItems: [],
        verticeType: 'researcher'
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
    
    fillResearchersCombo = () => {
    const url = `${window.server}/researcher`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        this.setState({ researchers: data });
        })
    }

    searchComboInstitutesChange = (event) => {
        this.setState({ selectedInstitute: event.target.options[event.target.selectedIndex].value })
    }

    searchComboResearchersChange = (event) => {
        this.setState({ selectedResearcher: event.target.options[event.target.selectedIndex].value })
    }

    searchComboVerticeTypeChange = (event) => {
        this.setState({ verticeType: event.target.options[event.target.selectedIndex].value })
    }

    componentDidMount() {
        this.fillInstitutesCombo();
        this.fillResearchersCombo();
    }

    render() {
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <br />
                        <h1>Gerador de Grafo</h1>
                    </div>
                </div>
                <hr />
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="comboInstitutes" className="form-label me-2">Institutos:</label>
                        <select className="form-select" id="comboInstitutes" defaultValue="all" onChange={this.searchComboInstitutesChange}>
                            <option value="all">Todos</option>
                            {(this.state.institutes != null) && (this.state.institutes.length > 0) && this.state.institutes.map((institute) => 
                            {return <option key={institute.id} value={institute.id}>{institute.name}</option>})
                            }
                        </select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="production" className="form-label me-2">Produção:</label>
                        <select className="form-select" id="production">
                            <option value="all">Todos</option>
                            <option value="p1">P1</option>
                            <option value="p2">P2</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="comboResearchers" className="form-label me-2">Pesquisador:</label>
                        <select className="form-select" id="comboResearchers" defaultValue="all" onChange={this.searchComboResearchersChange}>
                            <option value="all">Todos</option>
                            {(this.state.researchers != null) && (this.state.researchers.length > 0) && (this.state.researchers.map((researcher) => {
                                return <option key={researcher.id} value={researcher.id}>{researcher.name}</option>
                            }))}
                        </select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="vertexType" className="form-label me-2">Tipo de vértice:</label>
                        <select className="form-select" id="vertexType" onChange={this.searchComboVerticeTypeChange}>
                            <option value="researcher">Pesquisador</option>
                            <option value="institute">Instituto</option>
                        </select>
                    </div>
                </div>
                
                <table className="table text-white">
                    <thead>
                        <tr className="text-center table-dark">
                            <th scope="col"></th>
                            <th scope="col">Início</th>
                            <th scope="col">Fim</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Vermelho</th>
                            <td>1</td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                        <tr>
                            <th scope="row">Amarelo</th>
                            <td><input type="number" className="form-control" /></td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                        <tr>
                            <th scope="row">Verde</th>
                            <td><input type="number" className="form-control" /></td>
                            <td><input type="number" className="form-control" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success">Aplicar</button>
                    </div>
                </div>
            </div>
        );
    }
}
