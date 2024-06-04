import { Link } from "react-router-dom"

import useDropdownLogic from "./Dropdown.logic.ts"

import styles from './Dropdown.module.css'

export default function Dropdown({ active }) {
  const { currentLinks } = useDropdownLogic()

  const dropdownClass = `${ styles['dropdown'] } ${ 
    active ? styles['dropdown--active'] : styles['dropdown--inactive'] }`
  
  return (
    <aside className={ dropdownClass }>
      <nav>

        <ul className={ styles[`dropdown__list`] }>
          { currentLinks.map(({ title, path }, key) => (
            <li key={ key }>
              <Link 
                className={ styles[`dropdown__link`] }
                to={ path }>{ title }</Link>
            </li>
          )) }
        </ul>

      </nav>
    </aside>
  )
}
