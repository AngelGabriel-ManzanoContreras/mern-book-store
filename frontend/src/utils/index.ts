export function isValidImage ( file: File ) {
  const validTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ];
  return validTypes.includes( file.type );
}

export function isValidSize ( file: File ) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}

export function formatDate ( date: string ) {
  //As JavaScript interpret the day as 0 based, we need to add 1 to the day
  const splitedDate = date.split('T')[0].split('-');
  const year = splitedDate[0];
  const month = splitedDate[1];
  const day = Number( splitedDate[2] ) + 1;

  const rawDate = `${ year }-${ month }-${ day }T${ date.split('T')[1] }`;

  const formatedDate = new Date( rawDate ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return formatedDate;
}