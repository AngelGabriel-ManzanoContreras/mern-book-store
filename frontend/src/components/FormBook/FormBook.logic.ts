import useFormData from '../../hooks/useFormData.ts';
import { BookInput } from '../../utils/models/book.ts';

import { isValidImage, isValidSize } from '../../utils/index.ts';

const DEFAULT_INCORRECT_IMAGE_SIZE = 'Invalid image size. Please select an image that is less than 5MB.';
const DEFAULT_INCORRECT_IMAGE_TYPE = 'Invalid image type. Please select a JPEG or PNG image.';

export default function useFormBookLogic ( initialBook = BookInput ) {
  const [ newBook, setBookAttribute ] = useFormData( initialBook );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookAttribute(name, value);
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if ( !files ) return;

    const file = files[0];
    const validImage = isValidImage( file );
    if ( !validImage ) {
      alert( DEFAULT_INCORRECT_IMAGE_TYPE );
      return;
    }

    const validSize = isValidSize( file );
    if ( !validSize ) {
      alert( DEFAULT_INCORRECT_IMAGE_SIZE );
      return;
    }

    const buffer = new FileReader();
    buffer.readAsDataURL( file );
    buffer.onload = () => {
      const base64 = buffer.result as string;
      setBookAttribute( 'image', base64, { imageName : file.name });
    }
  }

  return {
    newBook,
    onInputChange,
    onFileChange
  };
}
