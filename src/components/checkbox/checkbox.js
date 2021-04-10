import React from 'react';
import "./checkbox-styles.scss"
// import { Container } from './styles';

function Checkbox(props) {

  return (
    <div className="checkbox-container">
      <label className="container-label">{props.label}
        <input type="checkbox"  {...props} />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

export default Checkbox;