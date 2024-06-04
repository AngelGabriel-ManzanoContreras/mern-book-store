import useBooksLogic from './Books.logic.ts';

import styles from './Books.module.css';
import Layout from '../Layout/Layout.tsx';
import BookCard from '../../components/Books/BookCard/BookCard.tsx';
import Status from '../../components/General/Status/Status.tsx';
import CategoryList from '../../components/Books/CategoryList/CategoryList.tsx';

export default function BooksPage() {
  const { books, filteredBooks, categories, category, message, loading } = useBooksLogic();

  return (
    <Layout>

      <h1 className={ styles[`books-page__title`] }>Books</h1>

      <section className={ styles[`books-page__categories`] }>
        <h2>Categories</h2>
        <CategoryList categories={ categories } category={ category } />
      </section>
      
      <section className={ styles[`books-page__books`] } >
        { 
          ( category === '' ) ?
          ( 
            books.map( ( book ) => 
              ( <BookCard key={ book._id } book={ book } /> ) )
          ) : 
          ( 
            filteredBooks.map( ( book ) => 
              ( <BookCard key={ book._id } book={ book } /> ) ) 
          )
        }
      </section>

      <Status
        isLoading={ loading }
        errorMessage={ message }
      />

    </Layout>
  )
}