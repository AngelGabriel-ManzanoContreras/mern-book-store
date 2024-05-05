import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getBooks } from '../api/books.ts';

import Layout from '../components/Layout/Layout.tsx';
import BookCard from '../components/BookCard/BookCard.tsx';

export default function Home() {
  const [ books, setBooks ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return (
    <Layout>
      <button onClick={async () => {
        setLoading( true );
        const res = await getBooks();

        if ( res && res.data ) {
          setBooks( res.data.books );
        } else {
          setMessage( 'Failed to get books' );
        }

        setLoading( false );
      } }>Get Books</button>

      {
        ( message && !(loading) ) && <p>{ message }</p>
      }

      {
        books.length > 0 && (
          books.map( ( book: any, key: number ) => (
            <BookCard key={ key } book={ book } />
          ))
        )
      }
      {
        loading && <p>Loading...</p>
      }
    </Layout>
  )
}