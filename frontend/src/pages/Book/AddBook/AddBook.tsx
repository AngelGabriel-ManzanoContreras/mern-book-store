import useCreateBookLogic from './AddBook.logic.ts';

import FormBook from '../../../components/Book/FormBook/FormBook.tsx';
import Layout from '../../Layout/Layout.tsx';

export default function AddBookPage() {
  const { handleSubmit } = useCreateBookLogic();

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
