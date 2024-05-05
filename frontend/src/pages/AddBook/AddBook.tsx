import useCreateBookLogic from './AddBook.logic.ts';

import styles from './AddBook.module.css';
import Layout from '../../components/Layout/Layout.tsx';
import InputField from '../../components/InputField/InputField.tsx';
import InputFile from '../../components/InputFile/InputFile.tsx';

export default function AddBookPage() {
  const { newBook, onInputChange, onFileChange, handleSubmit } = useCreateBookLogic();

  const { 
    title , 
    author, 
    published_date, 
    pages, 
    language, 
    isbn, 
    publisher, 
    edition, 
    category, 
    description,
    image
  } = newBook;

  return (
    <Layout>
      <h1>Create Book</h1>

      <form 
        className={ styles[`add-book__form`] }
        onSubmit={handleSubmit}
      >

        <InputField
          type="text"
          name="title"
          label='Title'
          value={ title.value }
          required
          onChange={ onInputChange }
        />

        <InputField
          type="text"
          name="author"
          label='Author'
          value={ author.value }
          required
          onChange={ onInputChange }
        />
        
        <InputField
          type="text"
          name="category"
          label='Category'
          value={ category.value }
          required
          onChange={ onInputChange }
        />

        <InputField
          type="number"
          name="edition"
          label='Edition'
          value={ edition.value }
          required
          onChange={ onInputChange }
        />

        <InputField
          type="text"
          name="language"
          label='Language'
          value={ language.value }
          required
          onChange={ onInputChange }
        />
        
        <InputField
          type="text"
          name="publisher"
          label='Publisher'
          value={ publisher.value }
          required
          onChange={ onInputChange }
        />

        <InputField
          type="text"
          name="isbn"
          label='ISBN'
          value={ isbn.value }
          required
          onChange={ onInputChange }
        />
        
        <InputField
          type="month"
          name="published_date"
          label='Published Date'
          value={ published_date.value }
          required
          onChange={ onInputChange }
        />
        
        <InputField
          type="number"
          name="pages"
          label='Pages'
          value={ pages.value }
          required
          onChange={ onInputChange }
        />
        
        <InputField
          type="text"
          name="description"
          label='Description'
          value={ description.value }
          required
          onChange={ onInputChange }
        />

        <InputFile 
          name="image"
          accept='image/*'
          required
          onChange={onFileChange}
          label={''}
        />
        {
          image.imageName && <span>{ image.imageName }</span>
        
        }

        {
          image.value && <img src={ image.value } alt={ title?.value } width='200' />
        }
        
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
