import Navbar from "./navbar";

export default function Layout({ children, navbar_route }) {
    return (
      <>
        <Navbar route={navbar_route}></Navbar>
        <main>{children}</main>
      </>
    )
  }