import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import CytoscapeComponent from 'react-cytoscapejs';
const animatedComponents = makeAnimated();

export default class GraphGenerator extends Component {

    state = {
        institutes: [],
        selectedInstitutes: [],
        researchers: [],
        selectedResearchers: [],
        productionItems: [],
        vertexType: 'researcher',
        redRange: [1, 1],
        yellowRange: [2, 2],
        greenRange: [3, 3],
        productionType: 'all',
        showGraph: false,
        graphLayout: 'breadthfirst',
        graphData: []
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

    getGraphData = async() => {
        let url = `${window.server}/graph`;

        if (this.state.productionType && this.state.productionType !== "all") {
            if(url.includes('?'))
                url += `&productionType=${this.state.productionType}`;
            else
                url += `?productionType=${this.state.productionType}`;
        }

        if(this.state.vertexType && this.state.vertexType !== "researcher"){
            if(url.includes('?'))
                url += `&vertexType=${this.state.vertexType}`;
            else
                url += `?vertexType=${this.state.vertexType}`;
        }

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

         return fetch(url, requestOptions)
                .then((response) => response.json())
    }
    
    transformGraphData = (graphData) => {
        const nodes = graphData.nodes.map(vertex => ({
            data: {
                id: vertex.id,
                label: vertex.label
            }
        }));

        const edges = graphData.edges.map(edge => ({
            data: {
                source: edge.source,
                target: edge.target,
                weight: edge.weight
            }
        }));

        return [...nodes, ...edges];
    }

    generateGraph = async() => {
        const graphData = await this.getGraphData();
        

        this.setState({graphData: this.transformGraphData(graphData)});

        if(this.state.showGraph)
            this.setState({showGraph: false}, () => this.setState({showGraph: true}));
        else  
            this.setState({showGraph: true});
        
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
        return new Promise((resolve) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ researchers: data }, 
                        resolve); // Indica que a atualização do estado foi concluída
                })
            }
        )
    }
    
    filterResearchersCombo = (institutes) => {
        const filteredResearchers = this.state.researchers.filter((researcher) => institutes.includes(researcher.institute.id));
        const filteredSelectedResearchers = this.state.selectedResearchers.filter((researcher) => researcher.value==="all"||institutes.includes(this.getCompleteSelectedResearcher(researcher).institute.id)?true: false);
        this.setState({researchers: filteredResearchers, selectedResearchers: filteredSelectedResearchers});
    }

    searchComboInstitutesChange = async (selectedOptions) => {
    
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

    searchComboProductionChange = (event) => {
        this.setState({ productionType: event.target.options[event.target.selectedIndex].value })
    }

    searchComboResearchersChange = (selectedOptions) => {

        const selectedValues = selectedOptions.map(option => option.value);

        if (selectedValues.includes('all')) {
        // Se "Todos" estiver selecionado, somente ele deve permanecer selecionado
            this.setState({ selectedResearchers: [{ value: 'all', label: 'Todos' }] });
        } else {
        // Caso contrário, remover "Todos" da seleção
            this.setState({ selectedResearchers: selectedOptions.filter(option => option.value !== 'all') });
        }
    }

    searchComboVertexTypeChange = (event) => {
        this.setState({ vertexType: event.target.options[event.target.selectedIndex].value })
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

    graphComboLayoutChange = (event) => {
        this.setState({ graphLayout: event.target.options[event.target.selectedIndex].value })
        this.setState({ showGraph: false }, () => this.setState({showGraph: true}))
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
                        <Select id="comboInstitutes" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                            options={[{ value: 'all', label: 'Todos' }, ...this.state.researchers.length>0 ? this.state.institutes.map(institute => ({value: institute.id, label: institute.name})) : []]}
                            value={this.state.selectedInstitutes} onChange={this.searchComboInstitutesChange}
                            placeholder="Selecione institutos..." styles={this.destacarOpcaoTodos}
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="production" className="form-label me-3">Produção:</label>
                        <select className="form-select" id="production" onChange={this.searchComboProductionChange} value={this.state.productionType}>
                            <option value="all">Todos</option>
                            <option value="book">Livro</option>
                            <option value="article">Artigo</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="comboResearchers" className="form-label me-2">Pesquisador:</label>
                        <Select id="comboResearchers" closeMenuOnSelect={false} components={animatedComponents} isMulti 
                            options={[{ value: 'all', label: 'Todos' }, ...this.state.researchers.length>0? this.state.researchers.map(researcher => ({value: researcher.id, label: researcher.name})) : []]}
                            value={this.state.selectedResearchers} onChange={this.searchComboResearchersChange}
                            placeholder="Selecione pesquisadores..." styles={this.destacarOpcaoTodos}
                            
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <label htmlFor="vertexType" className="form-label">Tipo de vértice:</label>
                        <select className="form-select" id="vertexType" onChange={this.searchComboVertexTypeChange}>
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
                        <button className="btn btn-success" onClick={this.generateGraph}>Aplicar</button>
                    </div>
                </div>
                <div className='row m-3' id="graph-exhibition">
                    {this.state.showGraph && (
                        <div className="border rounded p-3">
                            <div className='col-5'>
                                <label htmlFor="graphLayout" className="form-label">Layout:</label>
                                <select id="graphLayout" className="form-select" aria-label="Selecione o layout" value={this.state.graphLayout} onChange={this.graphComboLayoutChange}>
                                    <option value="breadthfirst">Breadthfirst</option>
                                    <option value="random">Random</option>
                                    <option value="grid">Grid</option>
                                    <option value="circle">Circle</option>
                                    <option value="concentric">Concentric</option>
                                </select>
                            </div>
                        <CytoscapeComponent
                            elements={this.state.graphData}
                            style={{ width: "100%", height: "700px" }}
                            zoomingEnabled = {true}
                            maxZoom={3}
                            minZoom={0.3}
                            //adding a layout
                            layout={{
                            name: this.state.graphLayout,
                            fit: true,
                            directed: false,
                            padding: 50,
                            animate: true,
                            animationDuration: 1000,
                            avoidOverlap: true,
                            nodeDimensionsIncludeLabels: false
                            }}
                            //adding style sheet
                            stylesheet={[
                            {
                                selector: "node",
                                style: {
                                backgroundColor: "#555",
                                width: 30,
                                height: 30,
                                label: "data(label)",
                                "text-halign": "center",
                                "text-outline-color": "#555",
                                "text-outline-width": "1px",
                                "overlay-padding": "6px",
                                "z-index": "10",
                                color: "white",
                                "font-size": "12px"
                                }
                            },
                            {
                                selector: "node:selected",
                                style: {
                                "border-width": "6px",
                                "border-color": "#AAD8FF",
                                "border-opacity": "0.5",
                                "background-color": "#77828C",
                                "text-outline-color": "#77828C"
                                }
                            },
                            {
                                selector: "edge",
                                style: {
                                width: 3,
                                label: "data(weight)",
                                color: 'black',
                                "font-size": 10,
                                "text-rotation": "autorotate",
                                "curve-style": "bezier"
                                }
                            },
                            {
                                selector: `edge[weight <= ${this.state.redRange[1]}]`,
                                style: {
                                  'line-color': '#FF5733'
                                }
                              },
                              {
                                selector: `edge[weight >= ${this.state.yellowRange[0]}][weight <= ${this.state.yellowRange[1]}]`,
                                style: {
                                  'line-color': '#FFDA33'
                                }
                              },
                              {
                                selector: `edge[weight >= ${this.state.greenRange[0]}][weight <= ${this.state.greenRange[1]}]`,
                                style: {
                                  'line-color': '#54D858'
                                }
                              }
                            ]}
                        />
                    </div>
                    )}
                </div>
            </div>
        );
    }
}
