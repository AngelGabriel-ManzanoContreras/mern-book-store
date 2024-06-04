import { Link } from 'react-router-dom'

import useHeaderLogic from './Header.logic.ts'

import styles from './Header.module.css'
import MenuButton from '../MenuButton/MenuButton.tsx'
import Dropdown from '../Dropdown/Dropdown.tsx'

export default function Header() {
  const { dropdown, toggleDropdown } = useHeaderLogic()
  
  return (
    <header className={ styles[`header`] }>

      <Link 
        to="/" 
        className={ styles[`header__title`] }
      >Book store</Link>
      
      <MenuButton 
        onClick={ toggleDropdown }
      />

      <Dropdown 
        active={ dropdown }
      />
    
    </header>
  )
}
