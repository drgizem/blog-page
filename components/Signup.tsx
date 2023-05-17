import { Form,Button } from "react-bootstrap"
import { useContext, useState } from "react"
import styles from "../styles/signin.module.sass"
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { UserContext } from "./UserContext"
import { useRouter } from "next/router"
import { setDoc,getDoc,doc, updateDoc } from "firebase/firestore";


export const Signup=()=>{
  const [user,setUser]=useState({email:"",password:"",name:""})
  const {dispatch}=useContext(UserContext)
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
  const handleSignup=(e:any)=>{
    e.preventDefault()
    setValidated(true)
    createUserWithEmailAndPassword(auth,user.email,user.password)
    .then(()=>{
      updateProfile(auth.currentUser!,{
        displayName:user.name
      })
    })
    .then(()=>{
      dispatch({
        type:"login",payload:{
          name:auth.currentUser?.displayName,
          email:auth.currentUser?.email,
          id:auth.currentUser?.uid,
          photoURL:auth.currentUser?.photoURL
          }
      })
   })
   .then(()=>{
    router.push("/")
   })
  .catch((error)=>{
    console.log(error.message)
    error.message.includes("weak-password") && setError(true)
    error.message.includes("email-already-in-use") && setUserError(true)
  })
  }

  return <>
  <Form validated={validated} className={styles.signinForm} onSubmit={handleSignup}>
  <h1>Sign up</h1>
  <Form.Control className="mb-3" required type="text" placeholder="User name" onChange={handleChange} value={user.name} name="name"/>
  <Form.Control className="mb-3" style={userError ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} required type="email" placeholder="Email" onChange={handleChange} value={user.email} name="email"/>
  <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} type="password" placeholder="Password" onChange={handleChange} value={user.password} name="password"/>
  {error && <Form.Text className="mb-3 text-danger">Password should be at least 6 characters!</Form.Text>}
  {userError && <Form.Text className="mb-3 text-danger">This email already in use!</Form.Text>}
  <div><Button type="submit" className={styles.signinbtn}>Sign up</Button></div>
</Form>
  </>
  
}