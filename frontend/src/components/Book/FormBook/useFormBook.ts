import useFormData from '../../../hooks/useFormData.ts';
import { BookInput } from '../../../utils/models/book.ts';

import { serializeImage, isValidImage, isValidSize } from '../../../utils/index.ts';

const DEFAULT_INCORRECT_IMAGE_SIZE = 'Invalid image size. Please select an image that is less than 5MB.';
const DEFAULT_INCORRECT_IMAGE_TYPE = 'Invalid image type. Please select a JPEG or PNG image.';

export default function useFormBook ( initialBook = BookInput ) {
  const [ newBook, setBookAttribute ] = useFormData( initialBook );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookAttribute( name, value );
  }

  const onImageSerialized = ( image: string ) => {
    setBookAttribute( 'image', image );
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if ( !files ) return;

    const file = files[0];
    const validImage = isValidImage( file );
    const validSize = isValidSize( file );

    if ( !validImage ) {
      alert( DEFAULT_INCORRECT_IMAGE_TYPE );
      return;
    }

    if ( !validSize ) {
      alert( DEFAULT_INCORRECT_IMAGE_SIZE );
      return;
    }

    serializeImage( file, onImageSerialized );
  }

  return {
    newBook,
    onInputChange,
    onFileChange
  };
}
