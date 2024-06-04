import { MainButtonProps } from "./MainButton.interface"

import styles from './MainButton.module.css'

export default function MainButton({ text, onClick = () => {}, disabled, type } : MainButtonProps) {
  return (
    <button
      type={ type || 'button' }
      onClick={ onClick }
      disabled={ disabled }
      
      className={ styles[`main-button`] }
    >{ text }</button>
  )
}
