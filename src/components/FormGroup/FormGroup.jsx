import React from 'react'
import { Input } from 'antd'
import InputMask from 'react-input-mask'
import classNames from 'classnames'

import './FormGroup.scss'

const FormGroup = props => {
  const {
    className,
    kind,
    onChange,
    inputWrapperClassName,
    label,
    errorMessage,
    ...rest
  } = props

  const inputWrapperClass = classNames(
    'form-group',
    {
      'input-error': errorMessage
    },
    inputWrapperClassName
  )

  return (
    <div className={inputWrapperClass}>
      <label>
        {label}
        {kind === 'input' && <Input onChange={onChange} className='input' {...rest} />}
        {kind === 'input-mask' && <InputMask mask='+375(99)999-99-99' onChange={onChange} className='input' {...rest} />}
      </label>
      {errorMessage &&
        <span className='error-message'>{errorMessage}</span>
      }
    </div>
  )
}

export default FormGroup
