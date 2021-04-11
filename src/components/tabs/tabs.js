import { useEffect, useState } from "react";
import { FaCar, FaMapMarkerAlt, FaMotorcycle } from 'react-icons/fa'
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
    if (isDisabledModel) {
      return setIsDisabledVersion(true)
    }
  }, [isDisabledModel, makes])

  useEffect(() => {
    axios.get(urlCities)
      .then(res => setCities(res.data))
  }, [])

  useEffect(() => {
    api.get('/api/OnlineChallenge/Make')
      .then(res => setMakes(res.data))
  }, [])

  const handleOpportunities = (e) => {
    e.preventDefault()
    api.get('http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles?Page=1')
      .then(res => {
        setVehicles(res.data)
      })
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
                <div className="container-city">
                  <FaMapMarkerAlt size={18} className="icon-city" />
                  <select id="city">
                    <option value="">&#160; &#160; &#160; &#160;Onde:</option>
                    {cities.map(city => (
                      <option value={city.id} key={city.id}>&#160; &#160; &#160; &#160;{city.nome}</option>
                    ))}
                  </select>
                </div>
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
                <select disabled id="year">
                  <option value="">Ano desejado</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option defaultValue value="150">150</option>
                  <option value="200">200</option>
                </select>
                <select disabled id="price">
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
                <div className="advanced-button-container">
                  <button id="advanced-button" type="button">
                    {'>'} Busca avançada
                    </button>
                </div>
                <div className='clear-opportunities-container'>
                  <button type="reset" id="clear-button" >Limpar filtros</button>
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
          <h1>Olá,</h1>
          <h1>Como a api não suporta filtros, resolvi consumir apenas os serviçoes em formas escalonada, um dependendo do outro, e caso seja retirado o filtro, desabilito o botão</h1>
          <h1>Também não é possível consumir os serviços no deploy, pois a api está em HTTP, e na Vercel em HTTPS, mas você pode dar uma olhada aqui: <strong>https://webmotors-challenge.vercel.app/</strong></h1>
          <h1>O respositório é esse: https://github.com/gugagranato/webmotors-challenge</h1>
          <h1>Outro ponto foi o consumo da api de veículos quando clica no botão VER OFERTAS, que busco a primeira página e renderizo na página, além de consumir o serviço do IBGE para trazer as cidades</h1>
          <h1>Tentei usar bastante css a fim de evitar frameworks, e usei também o SASS, como é requerido para a vaga.</h1>
          <h1>Além disso, também usei um pouco de SEO, adicionando o mesmo texto do site oficial.</h1>

          <h2>Muito obrigado. 🤘</h2>


        </div>
      </div>
    </div>
  );
}

export default Tabs;