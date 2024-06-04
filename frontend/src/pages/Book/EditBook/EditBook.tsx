import useEditBookLogic from './EditBook.logic.ts';
import { Book } from '../../../utils/models/book.ts';

import FormBook from '../../../components/Book/FormBook/FormBook.tsx';
import Layout from '../../Layout/Layout.tsx';
import ModalAlert from '../../../components/General/ModalAlert/ModalAlert.tsx';
import MainButton from '../../../components/General/MainButton/MainButton.tsx';

const UPDATE_BOOK_SUCCESS = 'Book updated successfully';
const UPDATE_BOOK_ERROR = 'Error updating book';
const FETCH_BOOK_ERROR = 'Book not found';
const UPDATE_BOOK_CONFIRM = 'Are you sure you want to update this book?';
const UPDATE_BOOK_CONFIRM_TITLE = 'Update Book';

export default function EditBookPage() {
  const { 
    book, 
    loading, 
    activeModal, 
    informativeModal, 
    confirmModal,
    formSubmit, 
    formCancel,
    handleInformativeModal, 
    handleModalSubmit,
    handleModalCancel,
    handleCancelModal,
    handleConfirmModal
  } = useEditBookLogic();

  if ( Object.keys( book ).length === 0 && !loading ) return (
    <Layout>
      <ModalAlert
        active={ true }
        title={ FETCH_BOOK_ERROR }
        message={ FETCH_BOOK_ERROR }
      >
        <MainButton
          text='Go back'
          onClick={ () => window.location.href = '/' }
        />
      </ModalAlert>
    </Layout>
  );

  if ( Object.keys( book as Book ).length > 0 ) {
    return (
      <Layout>
        <h1>Edit Book</h1>

        <FormBook 
          onSubmit={ formSubmit } 
          onCancel={ formCancel }
          initialBook={ book } 
        />

        <ModalAlert
          active={ confirmModal }
          title='Cancel Edit'
          message='Are you sure you want to cancel the edit?'
        >
          <MainButton
            text='Yes'
            onClick={ handleConfirmModal }
          />

          <MainButton
            text='No'
            onClick={ handleCancelModal }
          /> 
        </ModalAlert>

        <ModalAlert 
          active={ activeModal }
          title={ UPDATE_BOOK_CONFIRM_TITLE }
          message={ UPDATE_BOOK_CONFIRM }
        >
          <MainButton
            type='submit'
            text='Update Book'
            onClick={ handleModalSubmit }
          />

          <MainButton
            text='Cancel'
            onClick={ handleModalCancel }
          />
        </ModalAlert>

        <ModalAlert
          active={ informativeModal }
          title={ informativeModal ? UPDATE_BOOK_SUCCESS : UPDATE_BOOK_ERROR }
          message={ informativeModal ? UPDATE_BOOK_SUCCESS : UPDATE_BOOK_ERROR }
        >
          <MainButton
            text='Ok'
            onClick={ handleInformativeModal }
          />
        </ModalAlert>

      </Layout>
    );
  }

}
