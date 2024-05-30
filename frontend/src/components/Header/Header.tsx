import { Link } from 'react-router-dom'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={ styles[`Header`] }>

      <Link 
        to="/" 
        className={ styles[`Header__title`] }
      >Book store</Link>
      
      <Link to="/book/add">create</Link>
    
    </header>
  )
}
