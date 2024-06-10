import { useState, useEffect } from "react"

import { authLinks, bookLinks } from "../../../utils/app-links.ts"

const unathorizedLinks = [
  authLinks.signIn,
  authLinks.signUp,
]

const authorizedLinks = [
  authLinks.logout,
  bookLinks.addBook,
]

export default function useDropdownLogic( auth = false ) {// auth could be get from a context
  const [ currentLinks, setCurrentLinks ] = useState( unathorizedLinks )

  useEffect(() => {
    setCurrentLinks( auth ? authorizedLinks : unathorizedLinks )
  }, [ auth ])

  return {
    currentLinks
  }
}
