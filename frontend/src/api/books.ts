import fetchData from './fetch';

export async function getBooks() {
  return await fetchData( '/books', 'GET' );
}