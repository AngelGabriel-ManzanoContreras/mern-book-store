import { saveBook } from '../../api/book.ts';
import { Book } from '../../utils/models/book.ts';

const SuccessMessage = 'Book created successfully';
const ErrorMessage = 'Error creating book';

export default function useCreateBookLogic () {

  const handleSubmit = async ( newBook : object ) => {
    const formatedBookData = Object.keys( newBook ).reduce( ( acc : any, key : string ) => {
      acc[ key ] = newBook[ key ].value;
      return acc;
    }, {} );
    
    const res = await saveBook( formatedBookData as Book );

    if ( res && res.data ) {
      alert( SuccessMessage );
      
    } else {
      alert( ErrorMessage );
    }
  };

  return {
    handleSubmit
  };
}
