import React from 'react'

import { InputFieldProps } from './InputField-Interface'

import styles from './InputField.module.css'

export default function InputField({ type, name, label, value, required, onChange }: InputFieldProps) {
  return (
    <section className={ styles[`InputField`] }>
      <label className={ styles[`InputField--label`] } htmlFor={name}>{ label || name }</label>
      <input
        required={required}
        className={ styles[`InputField--input`] }
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
