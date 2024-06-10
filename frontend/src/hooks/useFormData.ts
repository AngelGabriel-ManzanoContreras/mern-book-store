import { useEffect, useState } from 'react';

export default function useFormData( initialFormData : object ) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData( initialFormData );
  }, [ initialFormData ]);

  const handleInputChange = (name: string, values: never) => {
    if ( values === undefined ) return;

    if (typeof values[0] === 'object') {
      setFormData({
      ...formData,
      [ name ]: {
        ...formData[ name ],
        ...values,
      },
      });
    } else {
      setFormData({
      ...formData,
      [name]: values,
      });
    }
  };

  return [ formData, handleInputChange ];
}