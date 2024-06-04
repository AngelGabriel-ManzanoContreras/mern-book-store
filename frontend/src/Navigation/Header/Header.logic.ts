import { useState } from "react"

export default function useHeaderLogic() {
    const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => setDropdown(!dropdown)

  return {
    dropdown,
    toggleDropdown
  }
}
