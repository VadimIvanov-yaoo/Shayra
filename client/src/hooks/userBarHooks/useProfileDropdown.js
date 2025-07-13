import { useRef, useState } from 'react'

export const useProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [name, setName] = useState('')

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  return {
    isOpen,
    toggleDropdown,
    dropdownRef,
    show,
    handleShow,
    handleClose,
    name,
    setName,
    handleClickOutside,
  }
}
