import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBook, updateBook } from '../../../api/book.ts';
import { Book, BookInput } from '../../../utils/models/book.ts';

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

export default function useEditBookLogic () {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [ book, setBook ] = useState( BookInput );
  const [ loading, setLoading ] = useState( false );
  const [ message, setMessage ] = useState( '' );
  const [ activeModal, setActiveModal ] = useState( false );
  const [ informativeModal, setInformativeModal ] = useState( false );
  const [ formBook, setFormBook ] = useState( {} );
  const [ confirmModal, setConfirmModal ] = useState( false );

  const fetchBook = async () => {
    setLoading( true );
    if ( id === '' ) return setMessage( 'Book ID is required' );
    
    const res = await getBook( id );
    
    if ( res && res.data ) {
      const bookToEdit = prepareBookData( res.data.book as Book );
      
      setBook( bookToEdit );
    } else {
      setMessage( 'Failed to get book' );
    }
    
    setLoading( false );
  }

  /*
   * Function to send request to update book
   */
  const handleSubmit = async ( editedBook : object ) => {
    const formatedBookData = Object.keys( editedBook ).reduce( ( acc : any, key : string ) => {
      acc[ key ] = editedBook[ key ].value;
      return acc;
    }, {} );
    
    const res = await updateBook( formatedBookData as Book );

    // Check if the book was updated successfully
    return ( res && res.data )
  };

  /*
   * Function to handle form submission
   */
  const formSubmit = ( book ) => {
    setActiveModal( true );
    setFormBook( book );
  }

  const formCancel = () => {
    setConfirmModal( true );
  }

  const handleConfirmModal = () => {
    setConfirmModal( false );
    navigate( '/' );
  }

  const handleCancelModal = () => {
    setConfirmModal( false );
  }

  /*
   * Function to handle modal submission
   */
  const handleModalSubmit = async () => {
    const res = await handleSubmit( formBook );
    if ( res ) {
      setActiveModal( false );
      setInformativeModal( true );
    } else {
      setActiveModal( false );
      setInformativeModal( true );
    }
  }

  /*
   * Function to handle modal cancel
   */
  const handleModalCancel = () => {
    setActiveModal( false );
  }

  /*
   * Function to handle informative modal
   */
  const handleInformativeModal = () => {
    setInformativeModal( false );
    navigate( `/book/${ id }` );
  }
  
  useEffect(() => {
    fetchBook();
  }, [ id ]);

  return {
    book,
    loading,
    message,
    activeModal,
    informativeModal,
    confirmModal,
    formSubmit,
    formCancel,
    handleModalSubmit,
    handleModalCancel,
    handleInformativeModal,
    handleConfirmModal,
    handleCancelModal,
  };
}
