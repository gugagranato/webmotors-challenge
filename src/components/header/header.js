import React from 'react';
import logo from '../../assets/img/logos/webmotors.svg'
// import { Container } from './styles';
import './header-styles.scss'

function Header() {
  return (
    <div style={{ margin: '0 auto', maxWidth: 933 }}>
      <div className="img">
        <img src={logo} alt='Quer comprar ou vender um veículo sem sair de casa? Aqui você conta com uma experiência segura e 100% online. Acesse já!' />
      </div>
    </div>
  )
}

export default Header;