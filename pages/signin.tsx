import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Signup } from "@/components/Signup";
import { Signin } from "@/components/Signin";
import { NavbarModal } from "@/components/Navbar";
import styles from "../styles/signin.module.sass"


export default function SigninPage(){
  const [signin,setSignin]=useState(false)

  return (
  <>
  <Container>
  <NavbarModal/>
  <div className={styles.signincard}>
  <Form.Check className={styles.signincheck}  type="switch" id="custom-switch" label="Create an account" onChange={()=>setSignin(!signin)}/>
  {signin ? <Signup /> : <Signin />}
  </div>
  </Container>
  </>
  )
}