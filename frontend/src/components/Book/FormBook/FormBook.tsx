import useFormBookLogic from './FormBook.logic.ts';
import { FormBookProps } from './FormBook.interface.ts';
import { Book } from '../../../utils/models/book.ts';

import styles from './FormBook.module.css';
import MainButton from '../../General/MainButton/MainButton.tsx';

const placeholders = {
  title: 'Book Title',
  author: 'Author Name',
  publisher: 'Publisher Name',
  category: 'Category',
  published_date: '',
  isbn: '',
  pages: 0,
  language: 'Language',
  description: 'Description',
  image: 'https://via.placeholder.com/150',
};

export default function FormBook({ initialBook, required = false, onSubmit, onCancel = ( () => {} ) } : FormBookProps) {
  const { newBook, onInputChange, onFileChange } = useFormBookLogic( initialBook );

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
    <form 
      onSubmit={ handleSubmit }
      className={ styles[`form-book`] }
    >
      <section className={ styles[`form-book__presentation`] }>
        <input
          type="text"
          name="title"
          required
          placeholder={ placeholders.title }
          defaultValue={ title.value }
          onChange={ onInputChange }

          className={ styles[`form-book__title`] } 
        />
        <input 
          type="text"
          name="author"
          required
          placeholder={ placeholders.author }
          defaultValue={ author.value }
          onChange={ onInputChange }

          className={ styles[`form-book__author`] } 
        />
      </section>

      <figure className={ styles[`form-book__image`] }>

        <label htmlFor="image"
          className={ styles[`form-book__image-label`] }
          onClick={ (e) => {
            e.preventDefault();
            //Why I can't retreive only the input element?
            const input = document.getElementsByName('image')[0];
            if (input) {
              input.click();
            }
          }

          }
        >Select an Image</label>

        <input 
          type="file" 
          name="image" 
          accept='image/*' 
          required={ required } 
          onChange={ onFileChange } 

          className={ styles[`form-book__image-input`] }
        />

        <img src={ image.value || placeholders.image } alt={ title.value } />
      </figure>

      <section className={ styles[`form-book__details`] }>
        <h5>Details</h5>
        
        <section>
          <p>Edition: </p>
          <input 
            type="number"
            name="edition"
            required
            defaultValue={ edition.value }
            onChange={ onInputChange }
          />
        </section>

        <section>
          <p>Publisher:</p>
          <input 
            type="text"
            name="publisher"
            required
            placeholder={ placeholders.publisher }
            defaultValue={ publisher.value }
            onChange={ onInputChange }
          />
          
        </section>

        <section>
          <p>Genre: </p>
          <input 
            type="text"
            name="category"
            required
            placeholder={ placeholders.category }
            defaultValue={ category.value }
            onChange={ onInputChange }
          />
        </section>

        <section>
          <p>Language: </p>
          <input 
            type="text"
            name="language"
            required
            placeholder={ placeholders.language }
            defaultValue={ language.value }
            onChange={ onInputChange }
          />
        </section>

        <section>
          <p>Published Date: </p>
          <input 
            type="date"
            name="published_date"
            required
            placeholder={ placeholders.published_date }
            defaultValue={ published_date.value }
            onChange={ onInputChange }
          />
        </section>
        
        <section>
          <p>ISBN:</p>
          <input 
            type="text"
            name="isbn"
            required
            placeholder={ placeholders.isbn }
            defaultValue={ isbn.value }
            onChange={ onInputChange }
          />
        </section>

        <section>
          <p>Pages:</p>
          <input 
            type="number"
            name="pages"
            required
            defaultValue={ pages.value }
            onChange={ onInputChange }
          />
        </section>
      </section>

      <section className={ styles[`form-book__description`] }>
        <h5>Description</h5>
        <textarea
          name="description"
          required
          placeholder={ placeholders.description }
          defaultValue={ description.value }
          onChange={ onInputChange }
        ></textarea>
      </section>

      <section className={ styles[`form-book__buttons`]}>
        <MainButton 
          text="Save"
          type="submit"
        />

        <MainButton 
          text="Cancel"
          onClick={ onCancel }
        />
      </section>

    </form>
  );
}
