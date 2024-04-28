export const validateBook = (book) => {
  if (
    !book.title || 
    !book.author || 
    !book.published_date || 
    !book.pages || 
    !book.language || 
    !book.isbn || 
    !book.publisher || 
    !book.edition || 
    !book.description ||
    !book.category
    ) {
    return false;
  }

  return true;
}

export const formatBook = ( body ) => {
  return {
    title: body.title,
    author: body.author,
    published_date: body.published_date,
    pages: body.pages,
    language: body.language,
    isbn: body.isbn,
    publisher: body.publisher,
    edition: body.edition,
    description: body.description,
    category: body.category,
    image : body.image
  };
}

