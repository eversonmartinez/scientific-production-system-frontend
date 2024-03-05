import React, { Component } from 'react'

export default class Menu extends Component {
  render() {
    return (
      <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#"><i class="bi bi-house-fill"></i> Home</a>
              <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Scientific Production System</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <ul    l class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="index.html">Painel Principal</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Itens de Produção</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="instituto.html">Instituto</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Pesquisador</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Gerador de grafo</a>
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
