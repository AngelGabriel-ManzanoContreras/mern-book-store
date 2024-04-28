import useFormData from '../../hooks/useFormData.ts';
import { saveBook } from '../../api/book.ts';
import { BookInput } from '../../utils/models/book.ts';
import { isValidImage, isValidSize } from '../../utils/index.ts';

export default function useCreateBookLogic () {
  const [ newBook, setBook ] = useFormData( BookInput );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook(name, value);
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files[0];
    const typeValidation = isValidImage( file );

    if ( !typeValidation ) {
      alert( 'Invalid image type. Please select a JPEG or PNG image.' );
      return;
    }

    const sizeValidation = isValidSize( file );

    console.log( newBook.image )

    if ( !sizeValidation ) {
      alert( 'Invalid image size. Please select an image that is less than 5MB.' );
      return;
    }

    const buffer = new FileReader();
    buffer.readAsDataURL( file );
    buffer.onload = (e: ProgressEvent<FileReader>) => {
      const base64 = buffer.result as string;
      console.log( file.name );
      console.log( newBook.image );
      setBook( 'image', base64, { imageName : file.name });
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formatedBookData = Object.keys( newBook ).reduce( ( acc : any, key : any ) => {
      acc[ key ] = newBook[ key ].value;
      return acc;
    }, {} );
    
    const res = await saveBook( formatedBookData );

    console.log( res );

    if ( res && res.data ) {
      console.log( res.data );
    } else {
      console.log( 'Failed to save book' );
    }
  };
  return {
    newBook,
    onInputChange,
    onFileChange,
    handleSubmit
  };
}
