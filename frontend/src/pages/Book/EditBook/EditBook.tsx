import useEditBook from './useEditBook.ts';
import { Book } from '../../../utils/models/book.ts';

import FormBook from '../../../components/Book/FormBook/FormBook.tsx';
import Layout from '../../Layout/Layout.tsx';
import ModalAlert from '../../../components/General/ModalAlert/ModalAlert.tsx';
import MainButton from '../../../components/General/MainButton/MainButton.tsx';

const FETCH_BOOK_ERROR = 'Book not found';

export default function EditBookPage() {
  const { 
    book, 
    loading,
    updateModal,
    cancelModal,
    informativeModal, 
    formSubmit, 
    formCancel
  } = useEditBook();

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

        {/* Modal to confirm the update of the book */}
        <ModalAlert 
          active={ updateModal.active }
          title={ updateModal.title }
          message={ updateModal.message }
        >
          <MainButton
            type='submit'
            text='Update Book'
            onClick={ updateModal.onSubmit }
          />

          <MainButton
            text='Continue editing'
            onClick={ updateModal.onCancel }
          />
        </ModalAlert>

        {/* Modal to confirm the cancel of the edit */}
        <ModalAlert
          active={ cancelModal.active }
          title={ cancelModal.title }
          message={ cancelModal.message }
        >
          <MainButton
            text='Yes'
            onClick={ cancelModal.onSubmit }
          />

          <MainButton
            text='No'
            onClick={ cancelModal.onCancel }
          /> 
        </ModalAlert>

        {/* Modal to inform the user about the result of the update */}
        <ModalAlert
          active={ informativeModal.active }
          title={ informativeModal.title }
          message={ informativeModal.message }
        >
          <MainButton
            text='Ok'
            onClick={ informativeModal.onSubmit }
          />
        </ModalAlert>

      </Layout>
    );
  }

}
