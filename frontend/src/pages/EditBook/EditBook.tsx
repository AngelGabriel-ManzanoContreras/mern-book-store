import { useParams } from 'react-router-dom';

import useEditBookLogic from './EditBook.logic.ts';

import FormBook from '../../components/FormBook/FormBook.tsx';
import Layout from '../../components/Layout/Layout.tsx';
import { Book } from '../../utils/models/book.ts';

export default function EditBookPage() {
  const { id = '' } = useParams();
  const { book, loading, message, handleSubmit } = useEditBookLogic( id );

  if ( Object.keys( book ).length === 0 && !loading ) return (
    <Layout>
      <h1>Book not found</h1>
      <p>{ message }</p>
    </Layout>
  );

  if ( Object.keys( book as Book ).length > 0 ) {
    return (
      <Layout>
        <h1>Edit Book</h1>

        <FormBook 
          onSubmit={ handleSubmit } 
          initialBook={ book } 
        />

      </Layout>
    );
  }

}
