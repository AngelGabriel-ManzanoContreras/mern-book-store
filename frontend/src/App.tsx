import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/Home';
import EditBookPage from './pages/EditBook';
import CreateBookPage from './pages/CreateBook';
import ViewBook from './pages/ViewBook';
import BooksPage from './pages/BooksPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/create" element={<CreateBookPage />} />
        <Route path="/books/:id" element={<ViewBook />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}