import { Link } from 'react-router-dom'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={ styles[`Header`] }>Book store

      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      
      <Link to="/book/add">create</Link>
    
    </header>
  )
}
