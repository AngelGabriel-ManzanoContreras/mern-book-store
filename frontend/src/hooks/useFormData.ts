import { useEffect, useState } from 'react';

export default function useFormData( initialFormData : object ) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData( initialFormData );
  }, [ initialFormData ]);

  const handleInputChange = (name: string, value: never, ...rest: never) => {
    //rest is an array, but we only need the first element which must be an object
    //rest is optional
    setFormData({
      ...formData,
      [name]: {
        ...formData[ name ],
        name,
        value,// This is the idea, overwriting the value of the object with the new value
        ...rest[0],
      },
    });
  };

  return [ formData, handleInputChange ];
}