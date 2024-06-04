import { Link } from "react-router-dom"

import { LinkComponentProps } from "./LinkComponent.interface"

import styles from './LinkComponent.module.css'

export default function LinkComponent({ active, path, text, children } : LinkComponentProps) {
  const style = `${ styles[`link-component`] } ${ active ? styles[`link-component--active`] : '' }`
  return (
    <Link 
      className={ style }
      to={ path }
    >{ text || children }</Link>
  )
}
