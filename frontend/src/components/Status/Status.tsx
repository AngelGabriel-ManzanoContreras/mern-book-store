import { StatusProps } from "./Status.interface";

export default function Status({ isLoading, errorMessage } : StatusProps ) {
  return (
    <div>
      { isLoading && <p>Loading...</p> }
      
      { ( errorMessage && isLoading ) && <p>{ errorMessage }</p> }
    </div>
  )
}
