import Styles from './input-styles.scss'

import React, { useRef } from 'react'
const Input = ({ state, setState, ...props }) => {
  const inputRef = useRef()
  return (
    <div className={Styles.inputWrap} >
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }}
      />
      <label data-testid={`${props.name}-label`} onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input