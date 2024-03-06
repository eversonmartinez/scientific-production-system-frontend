import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Menu extends Component {
  
  closeOffCanvas = () => {
    const closeOffCanvas = (document.getElementById('closeOffcanvas')); 
    if(closeOffCanvas)
      closeOffCanvas.click();
  }

  markCurrentPageLink = (event) => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((l) => l.classList.remove('active'));
    event.nativeEvent.srcElement.classList.add("active");
  }

  changeOfRoute = (event) => {
    this.closeOffCanvas();
    this.markCurrentPageLink(event);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <a class="navbar-brand" href="#"><i class="bi bi-house-fill"></i> Home</a> */}
                <Link to="/" className='navbar-brand'><i className="bi bi-house-fill"></i> Home</Link>
              <div className="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Scientific Production System</h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" id="closeOffcanvas"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      {/* <a class="nav-link active" aria-current="page" href="index.html">Painel Principal</a> */}
                      <Link to="/" className='nav-link active' onClick={this.changeOfRoute}>Painel Principal</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Itens de Produção</a>
                    </li>
                    <li className="nav-item">
                        {/* <a class="nav-link" href="instituto.html">Instituto</a> */}
                        <Link to="/instituto" className='nav-link' onClick={this.changeOfRoute}>Institutos</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Pesquisador</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Gerador de grafo</a>
                      </li>
                     {/* Exemplo de menu dropdown, caso desejemos utilizar no futuro--> */}
                    {/* <li class="nav-item dropdown"> 
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                      </a>
                      <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                          <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </li>  */}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
    )
  }
}
