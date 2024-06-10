import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getBook } from "../../../api/book.ts";
import { Book } from "../../../utils/models/book.ts";
import { bookLinks } from "../../../utils/app-links.ts";

export default function useViewBook() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [ book, setBook ] = useState( {} as Book );
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ activeModal, setActiveModal ] = useState(false);

  const fetchBook = async () => {
    setLoading( true );
    if ( id === '' ) return setMessage( 'Book ID is required' );
    
    const res = await getBook( id );

    if ( res && res.data ) {
      setBook( res.data.book );
    } else {
      setMessage( 'Failed to get book' );
    }

    setLoading( false );
  }

  const goToEditBook = () => {
    navigate( bookLinks.editBook.path( id ) );
  }

  const triggerModalDeleteBook = () => {
    //TODO implement deleteBook

    setActiveModal( !activeModal );

    /*
    * Trigger a modal to confirm the deletion

    * If confirmed, call the deleteBook API

    * Show modal with status message, either success or error

    * Redirect to the book list page
    */
  }

  const deleteBook = async () => {
    //TODO implement deleteBook
    setActiveModal( false );
    alert( 'Delete book' );
  }

  const cancelDeleteBook = () => {
    alert( 'Cancel delete book' );
    setActiveModal( false );
  }
  
  useEffect(() => {
    fetchBook();
  }, [ id ]);

  return {
    book,
    message,
    loading,
    activeModal,
    goToEditBook,
    triggerModalDeleteBook,
    deleteBook,
    cancelDeleteBook
  }
}
