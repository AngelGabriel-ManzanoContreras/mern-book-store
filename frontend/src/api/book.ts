import { Book } from '../utils/models/book';
import fetchData from './fetch';

export const saveBook = async ( book: Book ) => {
  return await fetchData( '/book', 'POST', book );
}