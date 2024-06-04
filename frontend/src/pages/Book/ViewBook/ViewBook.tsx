import { useParams, useNavigate } from 'react-router-dom'

import useViewBookLogic from './ViewBook.logic'
import { formatDate, formatEdition } from '../../../utils'

import styles from './ViewBook.module.css'
import Layout from '../../Layout/Layout'
import MainButton from '../../../components/General/MainButton/MainButton'
import Status from '../../../components/General/Status/Status'

export default function ViewBook() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { book, loading, message } = useViewBookLogic( id )

  const formatedDate = ( book.published_date ) ? formatDate( book.published_date ) : ''
  const formatedEdition = formatEdition( book.edition )
  
  return (
    <Layout>
      {
        book && (
          <article className={ styles[`view-book`] }>

            <section className={ styles[`view-book__presentation`] }>
              <section className={ styles[`view-book__header`] }>
                <h2 className={ styles[`view-book__title`] }>{ book.title }</h2>
                <h4 className={ styles[`view-book__edition`] }>{ formatedEdition }</h4>
              </section>

              <h3 className={ styles[`view-book__author`] }>{ book.author }</h3>

              <h4 className={ styles[`view-book__isbn`]}>ISBN: { book.isbn }</h4>
              <h4 className={ styles[`view-book__id`] }>Book ID: { id }</h4>
            </section>

            <figure className={ styles[`view-book__image`] }>
              <img src={ book.image } alt={ book.title } />
            </figure>

            <section className={ styles[`view-book__details`] }>
              <h5>Details</h5>
              <p>Edition: { formatedEdition }</p>
              <p>Publisher: { book.publisher }</p>
              <p>Genre: { book.category }</p>
              <p>Language: { book.language }</p>
              <p>Published Date: { formatedDate }</p>
              <p>ISBN: { book.isbn }</p>
              <p>Pages: { book.pages }</p>
            </section>

            <section className={ styles[`view-book__description`] }>
              <h5>Description</h5>
              <pre>{ book.description }</pre>
            </section>

          </article>
        )
      }

      <Status 
        isLoading={ loading } 
        errorMessage={ ( message && (!book) ) ? message : '' }
      />

      <MainButton 
        text="Edit" 
        onClick={ () => navigate( `/book/${id}/edit` ) } 
      />

    </Layout>
  )
}
