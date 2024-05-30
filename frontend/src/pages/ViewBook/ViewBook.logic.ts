import { useEffect, useState } from "react";

import { getBook } from "../../api/book.ts";
import { Book } from "../../utils/models/book.ts";

export default function useViewBookLogic( bookId : string ) {
  const [ book, setBook ] = useState( {} as Book );
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const fetchBook = async () => {
    setLoading( true );
    if ( bookId === '' ) return setMessage( 'Book ID is required' );
    
    const res = await getBook( bookId );

    if ( res && res.data ) {
      setBook( res.data.book );
    } else {
      setMessage( 'Failed to get book' );
    }

    setLoading( false );
  }
  
  useEffect(() => {
    fetchBook();
  }, [ bookId ]);

  return {
    book,
    message,
    loading
  }
}
