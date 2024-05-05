import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import EditBookPage from './pages/EditBook';
import AddBookPage from './pages/AddBook/AddBook';
import ViewBook from './pages/ViewBook/ViewBook';
import Books from './pages/Books/Books';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/add" element={<AddBookPage />} />
          <Route path="/book/:id" element={<ViewBook />} />
          <Route path="/book/:id/edit" element={<EditBookPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </>
  )
}