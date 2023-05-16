import { useContext } from "react"
import { Container, Navbar,Nav,Dropdown } from "react-bootstrap"
import { UserContext } from "./UserContext"
import Person2Icon from '@mui/icons-material/Person2';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.sass'

export const NavbarModal=()=>{
  const {state,dispatch}=useContext(UserContext)
  const router=useRouter()

  const handleLogout=()=>{
    dispatch({
      type:"logout"
    })
    localStorage.setItem("user","")
    router.push("/")
  }
  return <>
  <Navbar className={styles.navbarmodal} expand="lg">
    <Container>
      <Navbar.Brand href="/">BlogApp</Navbar.Brand>
      <Nav>
        <Nav.Link href="/topics">Topics</Nav.Link>
        {state.user.email ==="" ? <Nav.Link href="/signin">Sign in</Nav.Link> : 
        <Dropdown>
          <Dropdown.Toggle className={styles.navbartoggle}><Person2Icon/></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item ><Link href="/profile" className={styles.navbarlink}>Profile</Link></Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        }
      </Nav>
    </Container>
  </Navbar>
  </>
}