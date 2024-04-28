import { useState } from 'react'

export default function useFormData( initialFormData : any = {} ): any {
  const [ formData, setFormData ] = useState( initialFormData )

  const handleInputChange = ( name : string, value : any, ...rest : any ) => {
    //rest is an array, but we only need the first element which must be an object
    //rest is optional
    setFormData({ 
      ...formData, 
      [name]: {
        ...formData[ name ],
        name, 
        value,
        ...rest[0]
      } 
    })
  }

  return [
    formData,
    handleInputChange
  ]
}