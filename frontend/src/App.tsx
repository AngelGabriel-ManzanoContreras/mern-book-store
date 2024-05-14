import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import EditBookPage from './pages/EditBook/EditBook.tsx';
import AddBookPage from './pages/AddBook/AddBook.tsx';
import ViewBook from './pages/ViewBook/ViewBook.tsx';
import Books from './pages/Books/Books.tsx';
import NotFound from './pages/NotFound.tsx';

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/add" element={<AddBookPage />} />
          <Route path="/book/:id" element={<ViewBook />} />
          <Route path="/book/edit/:id" element={<EditBookPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </>
  )
}