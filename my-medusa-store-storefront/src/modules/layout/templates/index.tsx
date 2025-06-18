import React from "react"

import Nav from "@modules/layout/templates/nav"
import Footer from "./footer"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
