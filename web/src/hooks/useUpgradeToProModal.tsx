'use client'

import { createContext, useContext, useState } from 'react'

type UpgradeToProModalContextValue = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const UpgradeToProModalContext = createContext<UpgradeToProModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export const UpgradeToProModalContextWrapper: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <UpgradeToProModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UpgradeToProModalContext.Provider>
  )
}

export const useUpgradeToProModal = () => {
  return useContext(UpgradeToProModalContext)
}
