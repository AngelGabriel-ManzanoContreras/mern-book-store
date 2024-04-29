import { useState } from 'react';

import { getBooks } from '../api/books.ts';

import Layout from '../components/Layout/Layout.tsx';

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
          <ul>
            {
              books.map( ( book: any, key: number ) => (
                <li key={ key }>{ book.title }</li>
              ))
            }
          </ul>
        )
      }
      {
        books.length > 0 && (
          <ul>
            {
              books.map( ( book: any, key: number ) => (
                <img key={ key } width={200} src={ book.image } alt={ book.title } />
              ))
            }
          </ul>
        )
      }
      {
        loading && <p>Loading...</p>
      }
    </Layout>
  )
}