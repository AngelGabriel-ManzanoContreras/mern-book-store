import { useState } from 'react'

export default function useFormData( initialFormData : any = {} ): any {
  const [ formData, setFormData ] = useState( initialFormData )

  const handleInputChange = ( name : string, value : any, ...rest : any ) => {
    setFormData({ 
      ...formData, 
      [name]: {
        ...formData[ name ],
        name, 
        value,
        ...rest
      } 
    })
  }

  return [
    formData,
    handleInputChange
  ]
}