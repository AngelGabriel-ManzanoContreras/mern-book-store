import React from 'react'

import Header from '../../components/Navigation/Header/Header'

export default function Layout({ children, className }: { children: React.ReactNode, className?: string}) {
  return (
    <>
      <Header />
      <main className={ className }>
        { children }
      </main>
    </>
  )
}