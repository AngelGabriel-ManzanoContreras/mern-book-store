import useBooksLogic from './Books.logic.ts';

import styles from './Books.module.css';
import Layout from '../../components/Layout/Layout.tsx';
import BookCard from '../Components/BookCard/BookCard.tsx';
import Status from '../../components/Status/Status.tsx';
import CategoryList from '../Components/CategoryList/CategoryList.tsx';

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