import { useParams } from 'react-router-dom'

import useViewBookLogic from './ViewBook.logic'

import styles from './ViewBook.module.css'
import Layout from '../../components/Layout/Layout'

export default function ViewBook() {
  const { id = '' } = useParams()
  const { book, loading, message } = useViewBookLogic( id )

  const formatedDate = new Date( book.published_date ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  console.log( 'book', book )
  
  return (
    <Layout>
      {
        book && (
          <article className={ styles[`view-book`] }>

            <section className={ styles[`view-book__presentation`] }>
              <h2 className={ styles[`view-book__title`] }>{ book.title }</h2>
              <h3 className={ styles[`view-book__author`] }>{ book.author }</h3>

              <h4 className={ styles[`view-book__id`] }>Book ID: { id }</h4>

            </section>

            <figure className={ styles[`view-book__image`] }>
              <img src={ book.image } alt={ book.title } />
            </figure>

            <section className={ styles[`view-book__details`] }>
              <h5>Details</h5>
              <p>Publisher: { book.publisher }</p>
              <p>Genre: { book.category }</p>
              <p>Year: { formatedDate }</p>
              <p>ISBN: { book.isbn }</p>
              <p>Pages: { book.pages }</p>
            </section>

            <section className={ styles[`view-book__description`] }>
              <h5>Description</h5>
              <p>{ book.description }</p>
            </section>

          </article>
        )
      }
      {
        loading && <p>Loading...</p>
      }
      {
        message && <p>{ message }</p>
      }
    </Layout>
  )
}
