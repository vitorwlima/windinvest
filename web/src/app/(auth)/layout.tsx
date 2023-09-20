const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid min-h-screen place-items-center">{children}</main>
  )
}

export default Layout
