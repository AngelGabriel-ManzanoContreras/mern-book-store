import useCreateBookLogic from './AddBook.logic.ts';

import FormBook from '../../components/BookForm/FormBook.tsx';
import Layout from '../../components/Layout/Layout.tsx';

export default function AddBookPage() {
  const { handleSubmit } = useCreateBookLogic();

  return (
    <Layout>
      <h1>Create Book</h1>

      <FormBook onSubmit={ handleSubmit } />

    </Layout>
  );
}
