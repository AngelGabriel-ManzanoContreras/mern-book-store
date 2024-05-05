import { useEffect, useState } from 'react'

import { Book } from '../../utils/models/book.ts'
import { getBooks } from '../../api/books'

export default function useBooksLogic() {
  const [books, setBooks] = useState<Book[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const getBooksHandler = async () => {
    setLoading(true)
    const res = await getBooks()

    if (res && res.data) {
      setBooks(res.data.books)
    } else {
      setMessage('Failed to get books')
    }

    setLoading(false)
  }

  useEffect(() => {
    getBooksHandler()
  }, [])

  return {
    books,
    message,
    loading
  }
}
