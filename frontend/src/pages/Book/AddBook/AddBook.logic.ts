import { saveBook } from '../../../api/book.ts';
import { Book } from '../../../utils/models/book.ts';

const SuccessMessage = 'Book created successfully';
const ErrorMessage = 'Error creating book';

export default function useCreateBookLogic () {

  const handleSubmit = async ( newBook : Book ) => {
    const res = await saveBook( newBook );

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
