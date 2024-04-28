import React from 'react';

import { BookInput } from '../utils/models/book.ts';
import useFormData from '../hooks/useFormData.ts';
import { saveBook } from '../api/book.ts';

import InputField from '../components/InputField/InputField.tsx';
import Layout from '../components/Layout/Layout.tsx';

export default function CreateBookPage() {
  const [ newBook, setBook ] = useFormData( BookInput );

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
    description 
  } = newBook;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook(name, value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formatedBookData = Object.keys( newBook ).reduce( ( acc : any, key : any ) => {
      acc[ key ] = newBook[ key ].value;
      return acc;
    }, {} );
    
    const res = await saveBook( formatedBookData );

    console.log( res );

    if ( res && res.data ) {
      console.log( res.data );
    } else {
      console.log( 'Failed to save book' );
    }
  };

  return (
    <Layout>
      <h1>Create Book</h1>

      <form onSubmit={handleSubmit}>

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
          type="date"
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
          name="language"
          label='Language'
          value={ language.value }
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
          type="text"
          name="publisher"
          label='Publisher'
          value={ publisher.value }
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
          name="category"
          label='Category'
          value={ category.value }
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
        
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
