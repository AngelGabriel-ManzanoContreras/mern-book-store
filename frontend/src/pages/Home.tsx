import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getBooks } from '../api/books.ts';

export default function MainPage() {
  const [ books, setBooks ] = useState([]);
  const [ message, setMessage ] = useState('');

  return (
    <>

      <Link to="/books">Books</Link>
      <Link to="/books/create">Create Book</Link>
      <Link to="/books/1">View Book</Link>
      <Link to="/books/1/edit">Edit Book</Link>

      <button onClick={async () => {
        const res = await getBooks();

        if ( res && res.data ) {
          setBooks( res.data.books );
        } else {
          setMessage( 'Failed to get books' );
        }

      } }>Get Books</button>

      {
        message && <p>{ message }</p>
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
    </>
  )
}