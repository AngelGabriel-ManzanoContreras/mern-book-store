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
  
  //We need to keep the time to create a new date object
  const time = date.split('T')[1];
  const year = splitedDate[0];
  const month = splitedDate[1];
  const day = Number( splitedDate[2] ) + 1;

  //We need to create a new date object to format the date
  const rawDate = `${ year }-${ month }-${ day }T${ time }`;

  const formatedDate = new Date( rawDate ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } );

  return formatedDate;
}

export function formatEdition ( edition: number ) {
  if ( !edition ) return 'N/A';
  const lastDigit = edition.toString().split('').pop();
  let suffix = 'th';
  
  if ( lastDigit === '1' ) suffix ='st';
  if ( lastDigit === '2' ) suffix = 'nd';
  if ( lastDigit === '3' ) suffix = 'rd';

  return `${ edition }${ suffix } Edition`;
}

export function serializeImage ( imageFile: File, onImageSerialized : ( image: string ) => void ) {
  const buffer = new FileReader();
  buffer.readAsDataURL( imageFile );

  buffer.onload = () => {
    const base64 = buffer.result as string;
    onImageSerialized( base64 );
  }
}