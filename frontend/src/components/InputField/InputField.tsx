import { InputFieldProps } from './InputField-Interface'

import styles from './InputField.module.css'

export default function InputField({ type, name, label, value, required, onChange }: InputFieldProps) {
  return (
    <section className={ styles[`input-field`] }>
      <label className={ styles[`input-field--label`] } htmlFor={name}>{ label || name }</label>
      <input
        required={required}
        className={ styles[`input-field--input`] }
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
