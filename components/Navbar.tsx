import { useContext } from "react"
import { Container, Navbar,Nav,Dropdown } from "react-bootstrap"
import { UserContext } from "./UserContext"
import Person2Icon from '@mui/icons-material/Person2';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.sass'
import blog from "../blogging.png"
import Image from "next/image";

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
      <Navbar.Brand href="/"><Image src={blog} alt="" style={{width:"40px", height:"40px",marginRight:"10px"}}/>G'log</Navbar.Brand>
      <Nav className={styles.navbarmodalnav} >
        <Nav.Link href="/topics" className={styles.navsubtitle}>Topics</Nav.Link>
        {state.user.email ==="" ? <Nav.Link href="/signin">Sign in</Nav.Link> : 
        <Dropdown className={styles.navdropdown}>
          <Dropdown.Toggle className={styles.navbartoggle}><Person2Icon/></Dropdown.Toggle>
          <Dropdown.Menu className={styles.navdropdownmenu}>
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