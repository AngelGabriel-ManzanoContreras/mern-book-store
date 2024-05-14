import useCreateBookLogic from './AddBook.logic.ts';

import FormBook from '../../components/FormBook/FormBook.tsx';
import Layout from '../../components/Layout/Layout.tsx';

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
