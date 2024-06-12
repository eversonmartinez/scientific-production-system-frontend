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

    graphData = {
        "nodes": [
            {
                "id": 23809873085852,
                "label": "Rodrigo Salvador Monteiro"
            },
            {
                "id": 24160866319507,
                "label": "Leonardo da Silva Gasparini"
            },
            {
                "id": 28876341054325,
                "label": "Marcelo dos Santos Magalhães"
            },
            {
                "id": 47810385809553,
                "label": "Aleksandra Menezes de Oliveira"
            },
            {
                "id": 53636364868790,
                "label": "Lismeia Raimundo Soares"
            },
            {
                "id": 66576690749759,
                "label": "Gizele da Conceição Soares Martins"
            },
            {
                "id": 82487176176434,
                "label": "Marialda Moreira Christoffel"
            },
            {
                "id": 110662125645595,
                "label": "Rogério Ferreira de Moraes"
            },
            {
                "id": 112621452737067,
                "label": "Vinícius Antônio Gomes Marques"
            },
            {
                "id": 161902355523060,
                "label": "Vinicios Batista Pereira"
            },
            {
                "id": 194631586754988,
                "label": "Michael Maia Mincarone"
            },
            {
                "id": 235080730138338,
                "label": "Rute Ramos da Silva Costa"
            },
            {
                "id": 263660448893625,
                "label": "Jussára Mathias Netto Khouri"
            },
            {
                "id": 329773854976808,
                "label": "Patricia Regina Affonso de Siqueira"
            },
            {
                "id": 348923590713594,
                "label": "Márcio José de Medeiros"
            },
            {
                "id": 485361810192703,
                "label": "Luís Claudio de Carvalho"
            },
            {
                "id": 491984479926888,
                "label": "Rafael Malheiro da Silva do Amaral Ferreira"
            },
            {
                "id": 549723858731158,
                "label": "Danielle Marques de Araujo Stapelfeldt"
            },
            {
                "id": 559800226477492,
                "label": "Vinícius Albano Araújo"
            },
            {
                "id": 600549075776976,
                "label": "Juliana Milanez"
            },
            {
                "id": 604237405440586,
                "label": "Glaucimara Riguete de Souza Soares"
            },
            {
                "id": 658455060876989,
                "label": "Leonardo Lima dos Santos"
            },
            {
                "id": 659726776097432,
                "label": "Karine da Silva Verdoorn"
            },
            {
                "id": 676650998291996,
                "label": "Fernando Fernandes Morgado"
            },
            {
                "id": 692400140993944,
                "label": "Raquel Silva de Paiva"
            },
            {
                "id": 743793296062293,
                "label": "Daniel Cardoso Moraes de Oliveira"
            },
            {
                "id": 770145420421898,
                "label": "Lísia Mônica de Souza Gestinari"
            },
            {
                "id": 781779929562675,
                "label": "Camila Rolim Laricchia"
            },
            {
                "id": 814717344017544,
                "label": "Kate Cerqueira Revoredo"
            }
        ],
        "edges": [
            {
                "source": 23809873085852,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 23809873085852,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 23809873085852,
                "target": 28876341054325,
                "weight": 1.0
            },
            {
                "source": 24160866319507,
                "target": 194631586754988,
                "weight": 8.0
            },
            {
                "source": 28876341054325,
                "target": 47810385809553,
                "weight": 3.0
            },
            {
                "source": 28876341054325,
                "target": 110662125645595,
                "weight": 1.0
            },
            {
                "source": 47810385809553,
                "target": 604237405440586,
                "weight": 13.0
            },
            {
                "source": 47810385809553,
                "target": 743793296062293,
                "weight": 24.0
            },
            {
                "source": 53636364868790,
                "target": 24160866319507,
                "weight": 5.0
            },
            {
                "source": 53636364868790,
                "target": 47810385809553,
                "weight": 2.0
            },
            {
                "source": 53636364868790,
                "target": 235080730138338,
                "weight": 1.0
            },
            {
                "source": 53636364868790,
                "target": 770145420421898,
                "weight": 3.0
            },
            {
                "source": 53636364868790,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 53636364868790,
                "target": 28876341054325,
                "weight": 1.0
            },
            {
                "source": 66576690749759,
                "target": 47810385809553,
                "weight": 1.0
            },
            {
                "source": 66576690749759,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 66576690749759,
                "target": 348923590713594,
                "weight": 7.0
            },
            {
                "source": 66576690749759,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 66576690749759,
                "target": 658455060876989,
                "weight": 1.0
            },
            {
                "source": 66576690749759,
                "target": 235080730138338,
                "weight": 1.0
            },
            {
                "source": 82487176176434,
                "target": 24160866319507,
                "weight": 24.0
            },
            {
                "source": 82487176176434,
                "target": 23809873085852,
                "weight": 1.0
            },
            {
                "source": 82487176176434,
                "target": 47810385809553,
                "weight": 5.0
            },
            {
                "source": 82487176176434,
                "target": 549723858731158,
                "weight": 1.0
            },
            {
                "source": 82487176176434,
                "target": 604237405440586,
                "weight": 3.0
            },
            {
                "source": 82487176176434,
                "target": 28876341054325,
                "weight": 17.0
            },
            {
                "source": 82487176176434,
                "target": 485361810192703,
                "weight": 3.0
            },
            {
                "source": 82487176176434,
                "target": 66576690749759,
                "weight": 2.0
            },
            {
                "source": 82487176176434,
                "target": 110662125645595,
                "weight": 2.0
            },
            {
                "source": 82487176176434,
                "target": 235080730138338,
                "weight": 2.0
            },
            {
                "source": 82487176176434,
                "target": 329773854976808,
                "weight": 4.0
            },
            {
                "source": 194631586754988,
                "target": 348923590713594,
                "weight": 1.0
            },
            {
                "source": 194631586754988,
                "target": 28876341054325,
                "weight": 3.0
            },
            {
                "source": 194631586754988,
                "target": 491984479926888,
                "weight": 1.0
            },
            {
                "source": 194631586754988,
                "target": 600549075776976,
                "weight": 5.0
            },
            {
                "source": 194631586754988,
                "target": 485361810192703,
                "weight": 1.0
            },
            {
                "source": 194631586754988,
                "target": 743793296062293,
                "weight": 3.0
            },
            {
                "source": 235080730138338,
                "target": 24160866319507,
                "weight": 18.0
            },
            {
                "source": 329773854976808,
                "target": 604237405440586,
                "weight": 8.0
            },
            {
                "source": 329773854976808,
                "target": 600549075776976,
                "weight": 2.0
            },
            {
                "source": 329773854976808,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 329773854976808,
                "target": 28876341054325,
                "weight": 2.0
            },
            {
                "source": 348923590713594,
                "target": 600549075776976,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 781779929562675,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 47810385809553,
                "weight": 8.0
            },
            {
                "source": 348923590713594,
                "target": 549723858731158,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 24160866319507,
                "weight": 3.0
            },
            {
                "source": 348923590713594,
                "target": 770145420421898,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 28876341054325,
                "weight": 2.0
            },
            {
                "source": 348923590713594,
                "target": 235080730138338,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 23809873085852,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 110662125645595,
                "weight": 1.0
            },
            {
                "source": 348923590713594,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 485361810192703,
                "target": 24160866319507,
                "weight": 3.0
            },
            {
                "source": 485361810192703,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 549723858731158,
                "target": 110662125645595,
                "weight": 3.0
            },
            {
                "source": 549723858731158,
                "target": 604237405440586,
                "weight": 1.0
            },
            {
                "source": 549723858731158,
                "target": 47810385809553,
                "weight": 1.0
            },
            {
                "source": 549723858731158,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 559800226477492,
                "target": 82487176176434,
                "weight": 7.0
            },
            {
                "source": 559800226477492,
                "target": 47810385809553,
                "weight": 2.0
            },
            {
                "source": 559800226477492,
                "target": 53636364868790,
                "weight": 1.0
            },
            {
                "source": 559800226477492,
                "target": 24160866319507,
                "weight": 2.0
            },
            {
                "source": 559800226477492,
                "target": 235080730138338,
                "weight": 1.0
            },
            {
                "source": 559800226477492,
                "target": 28876341054325,
                "weight": 1.0
            },
            {
                "source": 600549075776976,
                "target": 161902355523060,
                "weight": 1.0
            },
            {
                "source": 604237405440586,
                "target": 770145420421898,
                "weight": 57.0
            },
            {
                "source": 604237405440586,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 659726776097432,
                "target": 24160866319507,
                "weight": 6.0
            },
            {
                "source": 659726776097432,
                "target": 600549075776976,
                "weight": 6.0
            },
            {
                "source": 659726776097432,
                "target": 485361810192703,
                "weight": 1.0
            },
            {
                "source": 659726776097432,
                "target": 47810385809553,
                "weight": 1.0
            },
            {
                "source": 659726776097432,
                "target": 692400140993944,
                "weight": 1.0
            },
            {
                "source": 743793296062293,
                "target": 53636364868790,
                "weight": 1.0
            },
            {
                "source": 770145420421898,
                "target": 28876341054325,
                "weight": 2.0
            },
            {
                "source": 770145420421898,
                "target": 600549075776976,
                "weight": 1.0
            },
            {
                "source": 770145420421898,
                "target": 24160866319507,
                "weight": 1.0
            },
            {
                "source": 770145420421898,
                "target": 549723858731158,
                "weight": 1.0
            },
            {
                "source": 770145420421898,
                "target": 194631586754988,
                "weight": 1.0
            }
        ]
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

        if(this.state.verticeType && this.state.verticeType !== "researcher"){
            if(url.includes('?'))
                url += `&verticeType=${this.state.verticeType}`;
            else
                url += `?verticeType=${this.state.verticeType}`;
        }

        let data;

        let selectedInstitutes = this.state.selectedInstitutes.map((selected) => selected.value?selected.value:selected)
        let selectedResearchers = this.state.selectedResearchers.map((selected) => selected.value?selected.value:selected)

        //TODO: Descomentar o trecho abaixo para a pesquisa filtrada por pesquisador funcionar
        // //Se não tiverem nem institutos nem pesquisadores selecionados, entende-se que a seleção será de todos. Por isso, não entrará em nenhuma condição de filtro abaixo
        // if(selectedInstitutes.length > 0 || selectedResearchers.length > 0){
            
        //     //Se os dois estiverem marcados para selecionar todos, não é necessário entrar em condição também
        //     if(!(selectedInstitutes.includes("all") && selectedResearchers.includes("all"))){
                
        //         //Se os pesquisadores não estiverem marcados como "todos" e tiverem alguma seleção eles entrão nessa condição
        //         if(!selectedResearchers.includes("all") && selectedResearchers.length>0){
        //             data = {
        //                 "researchers": selectedResearchers
        //             };
        //         }

        //         //Se os institutos não estiverem marcados como todos ao mesmo tempo que os pesquisadores estão vazio, a condição será a seguinte:
        //         else if(!selectedInstitutes.includes("all") && selectedResearchers.length>0){
        //             data = {
        //                 "researchers": this.state.researchers.filter((researcher) => selectedInstitutes.includes(researcher.institute.id))
        //             };
        //         }

        //     }
        // }

        //if(data){
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // };

            // fetch(url, requestOptions)
            //     .then((response) => response.json())
            //     .then((json) => json.data())
            //     .then((data) => {
            //         return data;
            //     })
        //}
        
        // //else:

        return fetch(url)
            .then((response) => 
                response.json()
            )
        
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

        //const newGraphData = this.transformGraphData(this.graphData);

        if(this.state.showGraph)
            this.setState({showGraph: false}, () => this.setState({showGraph: true}));
        else  
            this.setState({showGraph: true});
        
        //this.graphData = newGraphData;
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
                                // "line-color": "#6774cb",
                                //"line-color": "#AAD8FF",
                                //"target-arrow-color": "#6774cb",
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
