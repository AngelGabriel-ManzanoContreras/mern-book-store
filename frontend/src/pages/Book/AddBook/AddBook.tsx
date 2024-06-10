import useAddBook from './useAddBook.ts';

import FormBook from '../../../components/Book/FormBook/FormBook.tsx';
import Layout from '../../Layout/Layout.tsx';

export default function AddBookPage() {
  const { handleSubmit } = useAddBook();

  return (
    <Layout>
      <h1>Create Book</h1>

      <FormBook 
        required={ true }
        onSubmit={ handleSubmit } 
      />

    </Layout>
  );
}
