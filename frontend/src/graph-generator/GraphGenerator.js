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
        verticeType: 'researcher',
        redRange: [1, 1],
        yellowRange: [2, 2],
        greenRange: [3, 3],
        productionType: 'all',
        showGraph: false,
        graphLayout: 'breadthfirst',
        graphData: []
    }

    graphData = [
        { data: {
            "id": 23809873085852,
            "name": "Rodrigo Salvador Monteiro",
            "label": "Rodrigo Salvador Monteiro"
        }},
        { data: {
            "id": 24160866319507,
            "label": "Leonardo da Silva Gasparini"
        }},
        { data: {
            "id": 28876341054325,
            "label": "Marcelo dos Santos Magalhães"
        }},
        { data: {
            "id": 47810385809553,
            "label": "Aleksandra Menezes de Oliveira"
        }},
        { data: {
            "id": 53636364868790,
            "label": "Lismeia Raimundo Soares"
        }},
        { data: {
            "id": 66576690749759,
            "label": "Gizele da Conceição Soares Martins"
        }},
        { data: {
            "id": 82487176176434,
            "label": "Marialda Moreira Christoffel"
        }},
        { data: {
            "id": 110662125645595,
            "label": "Rogério Ferreira de Moraes"
        }},
        { data: {
            "id": 112621452737067,
            "label": "Vinícius Antônio Gomes Marques"
        }},
        { data: {
            "id": 161902355523060,
            "label": "Vinicios Batista Pereira"
        }},
        { data: {
            "id": 194631586754988,
            "label": "Michael Maia Mincarone"
        }},
        { data: {
            "id": 235080730138338,
            "label": "Rute Ramos da Silva Costa"
        } },
        { data: {
            "id": 263660448893625,
            "label": "Jussára Mathias Netto Khouri"
        } },
        { data: {
            "id": 329773854976808,
            "label": "Patricia Regina Affonso de Siqueira"
        } },
        { data: {
            "id": 348923590713594,
            "label": "Márcio José de Medeiros"
        } },
        { data: {
            "id": 485361810192703,
            "label": "Luís Claudio de Carvalho"
        } }, 
        { data: {
            "id": 491984479926888,
            "label": "Rafael Malheiro da Silva do Amaral Ferreira"
        } },
        { data: {
            "id": 549723858731158,
            "label": "Danielle Marques de Araujo Stapelfeldt"
        }},
        { data: {
            "id": 559800226477492,
            "label": "Vinícius Albano Araújo"
        } },
        { data: {
            "id": 600549075776976,
            "label": "Juliana Milanez"
        } },
        { data: {
            "id": 604237405440586,
            "label": "Glaucimara Riguete de Souza Soares"
        }},
        { data: {
            "id": 658455060876989,
            "label": "Leonardo Lima dos Santos"
        } },
        { data: {
            "id": 659726776097432,
            "label": "Karine da Silva Verdoorn"
        } },
        { data: {
            "id": 676650998291996,
            "label": "Fernando Fernandes Morgado"
        }},
        { data: {
            "id": 692400140993944,
            "label": "Raquel Silva de Paiva"
        }},
        { data: {
            "id": 743793296062293,
            "label": "Daniel Cardoso Moraes de Oliveira"
        } },
        { data: {
            "id": 770145420421898,
            "label": "Lísia Mônica de Souza Gestinari"
        }},
        { data: {
            "id": 781779929562675,
            "label": "Camila Rolim Laricchia"
        }},
        { data: {
            "id": 814717344017544,
            "label": "Kate Cerqueira Revoredo"
        }}
        ,
    
        { data:{
            "source": 23809873085852,
            "target": 24160866319507
        }},
        { data:{
            "source": 23809873085852,
            "target": 659726776097432
        }},
        { data:{
            "source": 28876341054325,
            "target": 47810385809553
        }},
        { data:{
            "source": 28876341054325,
            "target": 743793296062293
        } },
        { data: {
            "source": 47810385809553,
            "target": 604237405440586
        } },
        { data:{
            "source": 47810385809553,
            "target": 770145420421898
        }},
        { data:{
            "source": 53636364868790,
            "target": 24160866319507
        }},
        { data:{
            "source": 53636364868790,
            "target": 659726776097432
        }},
        { data:{
            "source": 53636364868790,
            "target": 47810385809553
        }},
        { data: {
            "source": 53636364868790,
            "target": 770145420421898
        }},
        { data: {
            "source": 53636364868790,
            "target": 28876341054325
        }},
        { data: {
            "source": 53636364868790,
            "target": 658455060876989
        }},
        { data:{
            "source": 66576690749759,
            "target": 28876341054325
        }},
        { data:{
            "source": 66576690749759,
            "target": 658455060876989
        }},
        { data:{
            "source": 66576690749759,
            "target": 235080730138338
        }},
        { data: {
            "source": 82487176176434,
            "target": 24160866319507
        }},
        { data:{
            "source": 82487176176434,
            "target": 659726776097432
        }},
        { data: {
            "source": 82487176176434,
            "target": 47810385809553
        }},
        { data: {
            "source": 82487176176434,
            "target": 28876341054325
        } },
        { data:{
            "source": 82487176176434,
            "target": 658455060876989
        } },
        { data:{
            "source": 82487176176434,
            "target": 485361810192703
        }},
        { data: {
            "source": 194631586754988,
            "target": 24160866319507
        }},
        { data: {
            "source": 194631586754988,
            "target": 659726776097432
        } },
        { data:{
            "source": 194631586754988,
            "target": 28876341054325
        } },
        { data:{
            "source": 194631586754988,
            "target": 658455060876989
        } },
        { data:{
            "source": 194631586754988,
            "target": 600549075776976
        } },
        { data: {
            "source": 194631586754988,
            "target": 743793296062293
        }},
        { data:{
            "source": 235080730138338,
            "target": 24160866319507
        }},
        { data:{
            "source": 235080730138338,
            "target": 659726776097432
        }},
        { data:{
            "source": 329773854976808,
            "target": 604237405440586
        } },
        { data:{
            "source": 348923590713594,
            "target": 600549075776976
        } },
        { data:{
            "source": 348923590713594,
            "target": 47810385809553
        }},
        { data:{
            "source": 348923590713594,
            "target": 24160866319507
        }},
        { data:{
            "source": 348923590713594,
            "target": 659726776097432
        }},
        { data:{
            "source": 348923590713594,
            "target": 692400140993944
        }},
        { data: {
            "source": 348923590713594,
            "target": 770145420421898
        }},
        { data:{
            "source": 348923590713594,
            "target": 28876341054325
        }},
        { data:{
            "source": 348923590713594,
            "target": 658455060876989
        } },
        { data:{
            "source": 348923590713594,
            "target": 110662125645595
        } },
        { data:{
            "source": 549723858731158,
            "target": 110662125645595
        } },
        { data:{
            "source": 549723858731158,
            "target": 47810385809553
        } },
        { data:{
            "source": 549723858731158,
            "target": 24160866319507
        }},
        { data:{
            "source": 549723858731158,
            "target": 659726776097432
        }},
        { data: {
            "source": 559800226477492,
            "target": 24160866319507
        }},
        { data: {
            "source": 559800226477492,
            "target": 235080730138338
        } },
        { data:{
            "source": 559800226477492,
            "target": 659726776097432
        } },
        { data:{
            "source": 659726776097432,
            "target": 24160866319507
        }},
        { data:{
            "source": 659726776097432,
            "target": 600549075776976
        }},
        { data:{
            "source": 659726776097432,
            "target": 485361810192703
        }},
        { data:{
            "source": 743793296062293,
            "target": 47810385809553
        }},
        { data: {
            "source": 770145420421898,
             "target": 28876341054325
        }},
        { data: {
            "source": 770145420421898,
            "target": 658455060876989
        }},
        { data:{
            "source": 770145420421898,
            "target": 600549075776976
        }},
        { data:{
            "source": 770145420421898,
            "target": 24160866319507
        }},
        { data:{
            "source": 770145420421898,
            "target": 659726776097432
        }},
        { data:{
            "source": 770145420421898,
            "target": 549723858731158
        }}
    ]

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

    getGraphData = () => {
        let url = `${window.server}/graph/search?verticeType=${this.state.verticeType}`;
    
        if (this.state.productionType && this.state.productionType !== "all") {
          url += `&productionType=${this.state.productionType}`
        }

        let data;

        if(this.state.selectedInstitutes && this.state.selectedInstitutes.length > 0){
            let data = {
                "institutes": this.state.selectedInstitutes
              };
        }

        if(this.state.selectedResearchers && this.state.selectedResearchers.length > 0){
            let data = {
                "researchers": this.state.selectedResearchers
            };
        }

        if(!data){
            fetch(url)
            .then((response) => response.json())
            .then((json) => json.data())
            .then((data) => {
                this.setState({graphData: data});
            })

            return;
        }

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((json) => json.data())
            .then((data) => {
                this.setState({graphData: data});
            })
    }
    
    generateGraph = () => {
        //this.getGraphData();

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
        const filteredSelectedResearchers = this.state.selectedResearchers.filter((researcher) => institutes.includes(this.getCompleteSelectedResearcher(researcher).institute.id));
        this.setState({researchers: filteredResearchers, selectedResearchers: filteredSelectedResearchers});
    }

    searchComboInstitutesChange = async (selectedOptions) => {
        // const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    
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
                        <button className="btn btn-success" onClick={this.generateGraph}>Aplicar</button>
                    </div>
                </div>
                <div className='row' id="graph-exhibition">
                    {this.state.showGraph && (
                        <div>
                            <label htmlFor="graphLayout" className="form-label">Layout:</label>
                            <select id="graphLayout" class="form-select" aria-label="Selecione o layout" value={this.state.graphLayout} onChange={this.graphComboLayoutChange}>
                                <option selected value="breadthfirst">Breadthfirst</option>
                                <option value="random">Random</option>
                                <option value="grid">Grid</option>
                                <option value="circle">Circle</option>
                                <option value="concentric">Concentric</option>
                            </select>
                        <CytoscapeComponent
                            elements={this.graphData}
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
                                width: 60,
                                height: 60,
                                label: "data(label)",
                                "text-halign": "center",
                                "text-outline-color": "#555",
                                "text-outline-width": "2px",
                                "overlay-padding": "6px",
                                "z-index": "10"
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
                                selector: "label",
                                style: {
                                color: "white",
                                width: 30,
                                height: 30,
                                fontSize: 30
                                // shape: "rectangle"
                                }
                            },
                            {
                                selector: "edge",
                                style: {
                                width: 3,
                                // "line-color": "#6774cb",
                                "line-color": "#AAD8FF",
                                "target-arrow-color": "#6774cb",
                                "curve-style": "bezier"
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
