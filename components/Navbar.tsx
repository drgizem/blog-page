import { Container, Navbar,Nav } from "react-bootstrap"


export const NavbarModal=()=>{


  return <>
  <Navbar bg="primary" expand="lg">
    <Container>
      <Navbar.Brand href="#home">BlogApp</Navbar.Brand>
      <Nav>
        <Nav.Link href="/topics">Topics</Nav.Link>
        <Nav.Link>Sign in</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
}