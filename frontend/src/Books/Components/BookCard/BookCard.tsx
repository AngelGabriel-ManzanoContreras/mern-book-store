import { Link } from "react-router-dom"

import { Book } from "../../../utils/models/book"

import styles from './BookCard.module.css'

export default function BookCard( { book } : { book: Book} ) {
  const { title, author, image } = book

  return (
    <article className={ styles[`book-card`] }>
      
      <figure className={ styles[`book-card__image`] }>

        <Link to={ `/book/${ book._id }` } className={ styles[`book-card__image-cta`] } >View book</Link>
        
        <img src={ image } alt={ title } />
        
      </figure>

      <section>
        <h3 className={ styles[`book-card__title`] }>{ title }</h3>
        <h4 className={ styles[`book-card__author`] }>{ author }</h4>
      </section>

    </article>
  )
}
