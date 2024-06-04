import { CategoryListProps } from './CategoryList.interface'

import styles from './CategoryList.module.css'
import LinkComponent from "../LinkComponent/LinkComponent"

export default function CategoryList({ categories, category } : CategoryListProps) {
  return (
    <ul className={ styles[`books-page__category-list`] }>
      { categories.length > 0 &&
        ( 
          <>
            <li>
              <LinkComponent 
                active={ category === '' }
                path="/"
              >All</LinkComponent>
            </li>
            {
              categories.map( ( categoryItem, key ) => ( 
                <li key={ key }>
                  <LinkComponent
                    active={ category === categoryItem }
                    path={ `/?cat=${ categoryItem }` }
                  >{ categoryItem }</LinkComponent>
                </li> ) 
              )
            }
          </>
        )
      }
    </ul>
  )
}
