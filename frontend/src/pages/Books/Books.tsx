import useBooksLogic from './Books.logic';

import styles from './Books.module.css';
import Layout from '../../components/Layout/Layout';
import BookCard from '../../components/BookCard/BookCard.tsx';

export default function BooksPage() {
  const { books, message, loading } = useBooksLogic();

  return (
    <Layout>

      <h1 className={ styles[`books-page__title`] }>Books</h1>
      
      <section className={ styles[`books-page__books`] } >
        { books.length === 0 
          ? (<p>No books</p>) 
          : ( 
              books.map( ( book ) => ( <BookCard key={ book._id } book={ book } /> ) )
            )
        }
      </section>
      { loading && <p>Loading...</p> }
      { ( message && !(loading) ) && <p>{ message }</p> }
    </Layout>
  )
}