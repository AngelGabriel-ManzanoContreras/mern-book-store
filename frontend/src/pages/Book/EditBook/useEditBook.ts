import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBook, updateBook } from '../../../api/book.ts';
import { Book, BookInput } from '../../../utils/models/book.ts';

const UPDATE_BOOK_CONFIRM_TITLE = 'Update Book';
const UPDATE_BOOK_CONFIRM = 'Are you sure you want to update this book?';

const CANCEL_UPDATE_TITLE = 'Cancel Edit';
const CANCEL_UPDATE_MESSAGE = 'Are you sure you want to cancel the edit?';

const UPDATE_BOOK_SUCCESS_TITLE = 'Book updated';
const UPDATE_BOOK_SUCCESS_MESSAGE = 'The book was updated successfully.';

const UPDATE_BOOK_ERROR_TITLE = 'Error updating book';
const UPDATE_BOOK_ERROR_MESSAGE = 'There was an error updating the book. Please try later.';

const LOADING_TITLE = 'Updating Book';
const LOADING_MESSAGE = 'Please wait...';

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
  const [ bookToUpdate, setBookToUpdate ] = useState( {} );
  const [ updateTrigger, setUpdateTrigger ] = useState( false );

  const [ updateModal, setUpdateModal ] = useState({
    active: false,
    title: UPDATE_BOOK_CONFIRM_TITLE,
    message: UPDATE_BOOK_CONFIRM,
    onSubmit: () => handleUpdateBook( bookToUpdate ),
    onCancel: () => setUpdateModal({ ...updateModal, active: false })
  });

  const [ cancelModal, setCancelModal ] = useState({
    active: false,
    title: CANCEL_UPDATE_TITLE,
    message: CANCEL_UPDATE_MESSAGE,
    onSubmit: () => handleCancelModal(),
    onCancel: () => setCancelModal({ ...cancelModal, active: false })
  });

  const [ informativeModal, setInformativeModal ] = useState({
    active: false,
    title: LOADING_TITLE,
    message: LOADING_MESSAGE,
    onSubmit: () => setInformativeModal({ ...informativeModal, active: false })
  });

  const formSubmit = ( editedBook : Book ) => {
    /*
     * Function to handle form submission */
    setBookToUpdate( editedBook );
    setUpdateTrigger( true );
  }

  const formCancel = () => {
    setCancelModal({ ...cancelModal, active: true });
  }

  const handleCancelModal = () => {
    setCancelModal({ ...cancelModal, active: false });
    navigate( '/' );
  }

  const handleUpdateBook = async ( bookToUpdate : Book ) => {
    /*
     * Function to handle modal submission */
    const res = await updateBook( bookToUpdate );

    const closeModal = informativeModal.onSubmit;

    if ( res && res.data ) {// Check if the book was updated

      setInformativeModal({
        active: true,
        title: UPDATE_BOOK_SUCCESS_TITLE,
        message: UPDATE_BOOK_SUCCESS_MESSAGE,
        onSubmit: () => {
          closeModal();
          navigate( `/book/${ bookToUpdate._id }` );
        }
      });
    } else {
      setInformativeModal({
        active: true,
        title: UPDATE_BOOK_ERROR_TITLE,
        message: UPDATE_BOOK_ERROR_MESSAGE,
        onSubmit: () => {
          closeModal();
          navigate( `/` );
        }
      });
    }
  }

  useEffect(() => {
    /*
     * Set the book to update and the modal to active
     * are separate useEffect to avoid the handleUpdateBook
     * to be called before the bookToUpdate is set correctly */
    if ( Object.keys( bookToUpdate ).length === 0 ) return;

    setUpdateModal({ 
      ...updateModal, 
      active: true, 
      onSubmit: () => handleUpdateBook( bookToUpdate as Book ) 
    });

    setUpdateTrigger( false );// Reset the trigger

  }, [ bookToUpdate, updateTrigger ]);

  useEffect(() => {
    /*
     * Scroll to top when component mounts */
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    /*
     * Fetch book data when there's an id */
    ( async () => {
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
    })()
  }, [ id ]);

  return {
    book,
    loading,
    message,
    updateModal,
    cancelModal,
    informativeModal,
    formSubmit,
    formCancel
  };
}
