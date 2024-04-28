import { SERVER_URL, SERVER_PORT } from '../utils/config.ts';
const SERVER = `${SERVER_URL}:${SERVER_PORT}`;

export default async function fetchData( url: string, method: string, data: any = null ) {
  try {
    const response = await fetch( `${ SERVER }${ url }`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify( data ) : null
    })
  
    if ( !response.ok ) {
      throw new Error( response.statusText )
    }
  
    return {
      status: response.status,
      data: await response.json()
    }
  } catch ( error ) {
    console.error( error )
    return null
  }
}