import React, { useState } from 'react';

const SERVER = 'http://127.0.0.1';
const PORT = 5555;
const API = `${SERVER}:${PORT}`;

const getBooks = async () => {
  const res = await fetch( `${API}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}

export default function BooksPage() {
  const [ books, setBooks ] = useState([]);
  const [ message, setMessage ] = useState('');

  return (
    <>
      <button onClick={async () => {
        const res = await getBooks();

        if ( res.books ) {
          setBooks( res.books);
        } else {
          setMessage( res.error );
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