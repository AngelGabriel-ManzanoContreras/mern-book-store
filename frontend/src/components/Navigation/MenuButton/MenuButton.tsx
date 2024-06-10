import icon from '../../../assets/icons/hamburger-menu.svg'

import styles from './MenuButton.module.css'

const ALT_TEXT = 'Menu'

export default function MenuButton({ onClick } : { onClick: () => void }){
  return (
    <button 
      className={ styles[`menu-button`] }
      onClick={ onClick }
      >
      <img 
        className={ styles[`menu-button__icon`] }
        src={ icon } 
        alt={ ALT_TEXT } 
        />
    </button>
  )
}