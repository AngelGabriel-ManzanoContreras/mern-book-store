import useFormBookLogic from './FormBook.logic.ts';
import { FormBookProps } from './FormBook.interface.ts';

import InputField from '../../components/InputField/InputField.tsx';
import { Book } from '../../utils/models/book.ts';

export default function FormBook({ onSubmit } : FormBookProps) {
  const { newBook, onInputChange, onFileChange } = useFormBookLogic();
  const { 
    title, 
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
  } = newBook as never;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit( newBook as Book );
  }

  return (
    <form onSubmit={ handleSubmit }>

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

      <input type="file" name="image" accept='image/*' required onChange={ onFileChange } />
      {
        image.imageName && <span>{ image.imageName }</span>
      
      }

      {
        image.value && <img src={ image.value } alt={ title?.value } width='200' />
      }
      
      <button type="submit">Submit</button>
    </form>
  );
}
