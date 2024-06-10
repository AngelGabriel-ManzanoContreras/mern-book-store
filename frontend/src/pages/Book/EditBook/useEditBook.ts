import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBook, updateBook } from '../../../api/book.ts';
import { Book, BookInput } from '../../../utils/models/book.ts';

const prepareBookData = ( book : Book ) => {
  const published_date = ( book[ 'published_date' ].includes('T') ) 
  ? book[ 'published_date' ].split('T')[0] : book[ 'published_date' ];

  const bookToEdit = { ...book, published_date };

  return bookToEdit;
}

export default function useEditBook () {
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
    const res = await updateBook( editedBook as Book );

    return ( res && res.data )
  };

  /*
   * Function to handle form submission
   */
  const formSubmit = ( book : Book ) => {
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
    if ( res ) {//TODO: correct logic
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
    window.scrollTo(0, 0);
  }, []);
  
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
