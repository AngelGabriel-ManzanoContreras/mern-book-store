import { useState, useEffect } from 'react';
import { getBook, updateBook } from '../../api/book.ts';
import { Book, BookInput } from '../../utils/models/book.ts';

const SuccessMessage = 'Book updated successfully';
const ErrorMessage = 'Error updating book';

const prepareBookData = ( book : Book ) => {
  const previousBook = { 
    _id : book._id,
    title: book.title, 
    author: book.author, 
    published_date: book.published_date, 
    pages: book.pages, 
    language: book.language, 
    isbn: book.isbn, 
    publisher: book.publisher, 
    edition: book.edition, 
    category: book.category, 
    description: book.description,
    image: book.image 
  }
  const bookToEdit = Object.keys( previousBook ).reduce( ( acc : any, key : string ) => {
    
    acc[ key ] = {
      name: key,
      value: book[ key ],
    };

    if ( key === 'published_date' && book[ key ] ) {
      acc[ key ].value = book[ key ].split('T')[0];
    }

    return acc;
  }, {} );

  return bookToEdit;
}

export default function useEditBookLogic ( bookId : string ) {
  const [ book, setBook ] = useState( BookInput );
  const [ loading, setLoading ] = useState( false );
  const [ message, setMessage ] = useState( '' );

  const handleSubmit = async ( editedBook : object ) => {
    const formatedBookData = Object.keys( editedBook ).reduce( ( acc : any, key : string ) => {
      acc[ key ] = editedBook[ key ].value;
      return acc;
    }, {} );
    
    const res = await updateBook( formatedBookData as Book );

    if ( res && res.data ) {
      alert( SuccessMessage );
    } else {
      alert( ErrorMessage );
    }
  };

  const fetchBook = async () => {
    setLoading( true );
    if ( bookId === '' ) return setMessage( 'Book ID is required' );
    
    const res = await getBook( bookId );

    if ( res && res.data ) {
      const bookToEdit = prepareBookData( res.data.book as Book );
      
      setBook( bookToEdit );
    } else {
      setMessage( 'Failed to get book' );
    }

    setLoading( false );
  }

  useEffect(() => {
    fetchBook();
  }, [ bookId ]);

  return {
    book,
    loading,
    message,
    handleSubmit
  };
}
