import { Form,Button } from "react-bootstrap"
import { User } from "@/types"
import { useContext, useState } from "react"
import styles from "../styles/signin.module.sass"
import { UserContext } from "./UserContext"
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

export const Signin=()=>{
  const [user,setUser]=useState({name:"",email:"",password:""})
  const {state,dispatch}=useContext(UserContext)
  const [validated, setValidated] = useState(false);
  const [error,setError]=useState(false)
  const [userError,setUserError]=useState(false)
  const router=useRouter()

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setUser((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const handleSignin=(e:any)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,user.email,user.password)
    .then((userCredential)=>{
      const user=userCredential.user
      dispatch({
        type:"login",payload:{
          name:user?.displayName,
          email:user?.email,
          id:user?.uid,
          photoURL:user?.photoURL
          }
      })
    })
    .then(()=>{
      router.push("/")
    })
    .catch((error)=>{
      console.log(error.message)
      error.message.includes("wrong-password") && setError(true)
      error.message.includes("user-not-found") && setUserError(true)
    })
  }

  return <>
  <Form validated={validated} className={styles.signinForm} onSubmit={handleSignin}>
    <h1>Sign in</h1>
    <Form.Control className="mb-3" required type="email" style={userError ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} placeholder="Email" onChange={handleChange} value={user.email} name="email"/>
    <Form.Control required type="password" style={error || userError ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} placeholder="Password" onChange={handleChange} value={user.password} name="password"/>
    {error && <Form.Text className="mb-3 text-danger">Wrong password !</Form.Text>}
    {userError && <Form.Text className="mb-3 text-danger">User is not found!</Form.Text>}
    <div><Button type="submit" className={styles.signinbtn}>Sign in</Button></div>
</Form>
  </>
  
}