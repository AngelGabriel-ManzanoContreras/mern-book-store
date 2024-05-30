import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import EditBookPage from './pages/EditBook/EditBook.tsx';
import AddBookPage from './pages/AddBook/AddBook.tsx';
import ViewBook from './pages/ViewBook/ViewBook.tsx';
import Books from './Books/Page/Books.tsx';
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