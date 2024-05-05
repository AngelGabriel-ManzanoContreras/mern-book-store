import { useState } from 'react';

import { InputFileProps } from './InputFile-interface';

import styles from './InputFile.module.css'

export default function InputFile({ name, label, accept, required, onChange }: InputFileProps) {
  const [ localLabel, setLocalLabel ] = useState( label || name )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    
    const file = files[0];
    setLocalLabel( file.name );

    onChange(e);
  }
  return (
    <section className={ styles[`input-file`] }>
      <label 
        className={ styles[`input-file__label`] } 
        htmlFor={name}
        onClick={ e => {
          e.preventDefault()
          const input = document.querySelector(`input[name=${ name }]`);
          if (input instanceof HTMLInputElement) input.click();
        }}
      >{ localLabel }</label>
      <input
        required={required}
        className={ styles[`input-file__input`] }
        type='file'
        name={name}
        accept={accept}
        onChange={onInputChange}
      />
    </section>
  )
}
