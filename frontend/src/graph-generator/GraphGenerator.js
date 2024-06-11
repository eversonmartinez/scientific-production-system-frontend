import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


const animatedComponents = makeAnimated();

export default class GraphGenerator extends Component {

    state = {
        institutes: [],
        selectedInstitutes: [],
        researchers: [],
        selectedResearchers: [],
        productionItems: [],
        verticeType: 'researcher',
        redRange: [1, 1],
        yellowRange: [2, 2],
        greenRange: [3, 3],
        production: 'all'
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
F
    searchComboInstitutesChange = (selectedOptions) => {
        // const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    
        const selectedValues = selectedOptions.map(option => option.value);

        if (selectedValues.includes('all')) {
        // Se "Todos" estiver selecionado, somente ele deve permanecer selecionado
            this.setState({ selectedInstitutes: [{ value: 'all', label: 'Todos' }] });
        } else {
        // Caso contrário, remover "Todos" da seleção
            this.setState({ selectedInstitutes: selectedOptions.filter(option => option.value !== 'all') });
        }
    }

    searchComboProductionChange = (event) => {
        this.setState({ production: event.target.options[event.target.selectedIndex].value })
    }

    searchComboResearchersChange = (selectedOptions) => {
        // const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        // this.setState({ selectedResearchers: selectedOptions });
        // //this.setState({ selectedResearcher: event.target.options[event.target.selectedIndex].value })

        // if (selectedOptions.includes("all")) {
        //     this.setState({ selectedResearchers: ["all"] });
        // } else {
        //     this.setState({ selectedResearchers: selectedOptions.filter(value => value !== "all") });
        // }

        const selectedValues = selectedOptions.map(option => option.value);

        if (selectedValues.includes('all')) {
        // Se "Todos" estiver selecionado, somente ele deve permanecer selecionado
            this.setState({ selectedResearchers: [{ value: 'all', label: 'Todos' }] });
        } else {
        // Caso contrário, remover "Todos" da seleção
            this.setState({ selectedResearchers: selectedOptions.filter(option => option.value !== 'all') });
        }
    }

    searchComboVerticeTypeChange = (event) => {
        this.setState({ verticeType: event.target.options[event.target.selectedIndex].value })
    }

    //Fiz uma espécide de método recursivo. Como a função setState é assíncrona e a verificação só pode ser feita após sua atualização, faz-se necessário passar um método callback
    //Para ser executado após a conclusão do setState(). Esse método callback será a própria função, garantindo que todas as verificações sejam acessadas com os valores corretos
    updateRanges = () => {
        if(this.state.yellowRange[0] !== this.state.redRange[1]+1){
            this.setState({yellowRange: [(this.state.redRange[1]+1), this.state.yellowRange[1]]}, this.updateRanges);
            return;
        }

        if(this.state.yellowRange[1] < this.state.yellowRange[0]){
            this.setState({yellowRange: [this.state.yellowRange[0], this.state.yellowRange[0]]}, this.updateRanges);
            return;
        }

        if(this.state.greenRange[0] !== this.state.yellowRange[1]+1){
            this.setState({greenRange: [(this.state.yellowRange[1]+1), this.state.greenRange[1]]}, this.updateRanges);
            return;
        }

        if(this.state.greenRange[1] < this.state.greenRange[0]){
            this.setState({greenRange: [this.state.greenRange[0], this.state.greenRange[0]]}, this.updateRanges);
        }
    }

    inputNumberRedChange = (event) => {
        var value = Number(event.target.value);
        if(value >= this.state.redRange[0]){
            this.setState({redRange: [this.state.redRange[0], value]}, this.updateRanges);  
        }
    }

    inputNumberYellowChange = (event) => {
        var value = Number(event.target.value);
        if(value > this.state.redRange[1] && value >= this.state.yellowRange[0]){
            this.setState({yellowRange: [this.state.yellowRange[0], value]}, this.updateRanges);  
        }
    }

    inputNumberGreenChange = (event) => {
        var value = Number(event.target.value);
        if(value > this.state.yellowRange[1] && value >= this.state.greenRange[0]){
            this.setState({greenRange: [this.state.greenRange[0], value]}, this.updateRanges);  
        }
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
                        <label htmlFor="comboInstitutes" className="form-label me-4">Institutos:</label>
                        {/* <select className="form-select" id="comboInstitutes" defaultValue="all" value={this.state.selectedInstitutes} onChange={this.searchComboInstitutesChange} multiple>
                            <option value="all">Todos</option>
                            {(this.state.institutes != null) && (this.state.institutes.length > 0) && this.state.institutes.map((institute) => 
                            {return <option key={institute.id} value={institute.id}>{institute.name}</option>})
                            }
                        </select> */}
                        <Select id="comboInstitutes" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                            options={[{ value: 'all', label: 'Todos' }, ...this.state.researchers.length>0 ? this.state.institutes.map(institute => ({value: institute.id, label: institute.name})) : []]}
                            value={this.state.selectedInstitutes} onChange={this.searchComboInstitutesChange}
                            placeholder="Selecione institutos..." styles={this.destacarOpcaoTodos}
                            
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="production" className="form-label me-3">Produção:</label>
                        <select className="form-select" id="production" onChange={this.searchComboProductionChange} value={this.state.production}>
                            <option value="all">Todos</option>
                            <option value="book">Livro</option>
                            <option value="article">Artigo</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="comboResearchers" className="form-label me-2">Pesquisador:</label>
                        {/* <select className="form-select" id="comboResearchers" defaultValue="all" value={this.state.selectedResearchers} onChange={this.searchComboResearchersChange} multiple>
                            <option value="all">Todos</option>
                            {(this.state.researchers != null) && (this.state.researchers.length > 0) && (this.state.researchers.map((researcher) => {
                                return <option key={researcher.id} value={researcher.id}>{researcher.name}</option>
                            }))}
                        </select> */}
                        <Select id="comboResearchers" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                            options={[{ value: 'all', label: 'Todos' }, ...this.state.researchers.length>0? this.state.researchers.map(researcher => ({value: researcher.id, label: researcher.name})) : []]}
                            value={this.state.selectedResearchers} onChange={this.searchComboResearchersChange}
                            placeholder="Selecione pesquisadores..." styles={this.destacarOpcaoTodos}
                            
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="vertexType" className="form-label">Tipo de vértice:</label>
                        <select className="form-select" id="vertexType" onChange={this.searchComboVerticeTypeChange}>
                            <option value="researcher">Pesquisador</option>
                            <option value="institute">Instituto</option>
                        </select>
                    </div>
                </div>
                
                <table className="table text-white">
                    <thead>
                        <tr className="text-center table-dark">
                            <th scope="col">Vértice (cor)</th>
                            <th scope="col">Início</th>
                            <th scope="col">Fim</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className='text-danger'>Vermelho</th>
                            <td><input type="number" className='form-control text-center' disabled value={1}></input></td>
                            <td><input type="number" className="form-control text-center" min={1} value={this.state.redRange[1]} onChange={this.inputNumberRedChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-warning'>Amarelo</th>
                            <td><input type="number" className="form-control text-center" disabled value={this.state.yellowRange[0]}/></td>
                            <td><input type="number" className="form-control text-center" min={this.state.yellowRange[0]} value={this.state.yellowRange[1]} onChange={this.inputNumberYellowChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-success'>Verde</th>
                            <td><input type="number" className="form-control text-center" disabled value={this.state.greenRange[0]}/></td>
                            <td><input type="number" className="form-control text-center" min={this.state.greenRange[0]} value={this.state.greenRange[1]} onChange={this.inputNumberGreenChange}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success" onClick={() => console.log(this.state)}>Aplicar</button>
                    </div>
                </div>
            </div>
        );
    }
}
