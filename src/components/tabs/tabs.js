import { useEffect, useState } from "react";
import { FaCar, FaMotorcycle } from 'react-icons/fa'
import axios from "axios";

import Checkbox from "../checkbox/checkbox";
import api from '../../services/api'
import "./tabs-styles.scss";

function Tabs() {
  const urlCities = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';

  const [toggleState, setToggleState] = useState(1);
  const [cities, setCities] = useState([]);
  const [isDisabledModel, setIsDisabledModel] = useState(true)
  const [isDisabledVersion, setIsDisabledVersion] = useState(true)
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {

    axios.get(urlCities)
      .then(res => setCities(res.data))

    if (isDisabledModel) {
      return setIsDisabledVersion(true)
    }
  }, [cities, isDisabledModel])
  useEffect(() => {
    api.get('/api/OnlineChallenge/Make')
      .then(res => setMakes(res.data))
  }, [makes])

  const handleOpportunities = (e) => {
    e.preventDefault()
    api.get('http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles?Page=1')
      .then(res => {
        setVehicles(res.data)
      })
  }

  const handleClearFilters = (e) => {
    e.preventDefault();
    setCities([])
    setMakes([]);
    setModels([]);
    setVersions([]);
    setVehicles([]);
  }

  const handleChangeMake = (e) => {
    const value = e.target.value;
    if (!value) return setIsDisabledModel(true);
    if (value) {
      api.get(`/api/OnlineChallenge/Model?MakeID=${value}`)
        .then(res => {
          setModels(res.data)
        })
      return setIsDisabledModel(false)
    }
  }

  const handleChangeModel = (e) => {
    const value = e.target.value;
    if (!value) return setIsDisabledVersion(true);
    if (value) {
      api.get(`/api/OnlineChallenge/Version?ModelID=${value}`)
        .then(res => {
          setVersions(res.data)
        })
      return setIsDisabledVersion(false)
    }
  }
  // style={{
  //   display: 'flex',
  //   justifyContent: 'space-between'
  // }}
  return (
    <div className="container">
      <div className="flex" >
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <FaCar size={26} className={'icon-color'} />
            <div>
              <p className="title-tab-buy">COMPRAR</p>
              <p className="title-tab-motor">CARRO</p>
            </div>
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <FaMotorcycle size={26} className={'icon-color'} />
            <div>
              <p className="title-tab-buy">COMPRAR</p>
              <p className="title-tab-motor">MOTO</p>
            </div>
          </button>
        </div>
        <div >
          <button className="buy-my-car" type="button" >Vender meu carro</button>
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div>
            <form>
              <div className="display-flex">
                <Checkbox label="Novo" />
                <Checkbox label="Usado" />
              </div>
              <div>
                <select id="city">
                  <option>&#xf041; Onde:</option>
                  {cities.map(city => (
                    <option value={city.id} key={city.id}>{city.nome}</option>
                  ))}

                </select>
                <select id="radius">
                  <option value="">Raio</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option defaultValue value="150">150</option>
                  <option value="200">200</option>
                </select>
                <select onChange={handleChangeMake} id="make">
                  <option value="">Marca: Todas</option>
                  {makes.map(make => (
                    <option value={make.ID} key={make.ID} >{make.Name}</option>
                  ))}
                </select>
                <select disabled={isDisabledModel} onChange={handleChangeModel} id="model">
                  <option value="">Modelo: Todos</option>
                  {models ? models.map(model => (
                    <option value={model.ID} key={model.ID} >{model.Name}</option>
                  )) : null}
                </select>
                <select disabled>
                  <option value="">Ano desejado</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option defaultValue value="150">150</option>
                  <option value="200">200</option>
                </select>
                <select disabled>
                  <option value="">Faixa de preço</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option defaultValue value="150">150</option>
                  <option value="200">200</option>
                </select>
                <select id="version" disabled={isDisabledVersion}>
                  <option value="">Versão: Todas</option>
                  {versions ? versions.map(version => (
                    <option value={version.ID} key={version.ID} >{version.Name}</option>
                  )) : null}
                </select>
              </div>
              <div className="button-container">
                <div>
                  <button id="advanced-button" type="button">
                    {'>'} Busca avançada
                    </button>
                </div>
                <div>
                  <button id="clear-button" onClick={handleClearFilters}>Limpar filtros</button>
                  <button id="opportunities-button" onClick={handleOpportunities}>Ver ofertas</button>
                </div>
              </div>
            </form>
            <div className="container-card">
              <div className="content-card" >
                <div>
                  {vehicles?.map(vehicle => (
                    <div key={vehicle.ID} className="card">
                      <div>
                        <img width={280} src={vehicle?.Image} alt="Imagem do carro" />
                      </div>
                      <div>
                        <p><strong>Marca:</strong> {vehicle.Make}</p>
                        <p><strong>Modelo:</strong> {vehicle.Model} - {vehicle.Version}</p>
                        <p><strong>Ano:</strong> {vehicle.YearFab}/{vehicle.YearModel}</p>
                        <p><strong>KM:</strong> {vehicle.KM}</p>
                        <p><strong>Preço:</strong> {vehicle.Price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h1>Custom Checkboxes</h1>


        </div>
      </div>
    </div>
  );
}

export default Tabs;