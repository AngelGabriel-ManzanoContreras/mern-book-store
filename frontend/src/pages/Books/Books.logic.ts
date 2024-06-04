import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Book } from '../../utils/models/book.ts'
import { getBooks } from '../../api/books.ts'

const NO_BOOKS_MESSAGE = 'No books'
const FAILED_TO_GET_BOOKS_MESSAGE = 'Failed to get books'

export default function useBooksLogic() {
  const [ searchParams ] = useSearchParams();

  const [ books, setBooks ] = useState<Book[]>([]);
  const [ filteredBooks, setFilteredBooks ] = useState<Book[]>([]);
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ categories, setCategories ] = useState<string[]>([]);
  const [ category, setCategory ] = useState<string>('');

  const getBooksHandler = async () => {
    setLoading(true)
    const res = await getBooks()

    if (res && res.data) {
      setBooks(res.data.books)

      if (res.data.books.length === 0) {
        setMessage( NO_BOOKS_MESSAGE )
      }
      
    } else {
      setMessage( FAILED_TO_GET_BOOKS_MESSAGE )
    }

    setLoading(false)
  }

  useEffect(() => {
    getBooksHandler()
  }, [])

  /*
   * Set category when URL params change
   */
  useEffect(() => {
    const urlCategory = searchParams.get('cat')

    if ( urlCategory ) setCategory( urlCategory )
    if ( !urlCategory ) setCategory( '' )
    
  }, [ searchParams ])

  /*
   * Update categories when books change
   */
  useEffect(() => {
    const localCategories = [ ...categories ];

    for (const book of books) {
      if ( !localCategories.includes( book.category ) ) {
        localCategories.push( book.category );
      }
    }

    if ( localCategories.length > 0 && localCategories.length !== categories.length ) {
      setCategories( localCategories );
    }

  }, [books]);

  useEffect(() => {
    if ( category !== '' ) {
      setFilteredBooks( filterBooksByCategory( category, books ) );
    }

  }, [ category, books ]);

  return {
    books,
    filteredBooks,
    categories,
    category,
    message,
    loading
  }
}

const filterBooksByCategory = ( category: string, books: Book[]) => {
  return books.filter( (book) => book.category === category )
}
