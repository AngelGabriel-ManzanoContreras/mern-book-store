import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import EditBookPage from './pages/Book/EditBook/EditBook.tsx';
import AddBookPage from './pages/Book/AddBook/AddBook.tsx';
import ViewBook from './pages/Book/ViewBook/ViewBook.tsx';
import Books from './pages/Books/Books.tsx';
import NotFound from './pages/NotFound.tsx';

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/add" element={<AddBookPage />} />
          <Route path="/book/:id" element={<ViewBook />} />
          <Route path="/book/:id/edit" element={<EditBookPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </>
  )
}