import { NavbarModal } from "@/components/Navbar"
import { UserContext } from "@/components/UserContext"
import { Avatar } from "@mui/material"
import { updateProfile } from "firebase/auth"
import { useContext, useState,useEffect } from "react"
import { Button, Card, Container,Form } from "react-bootstrap"
import { auth,storage} from "../firebase";
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"
import styles from "../styles/profile.module.sass"


export const ProfilePage=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [image,setImage]=useState<any>(null)
  const [imgUrl,setImgUrl]=useState(null || "")

  useEffect(()=>{
    const uploadFile=()=>{
      const imageRef=ref(storage,`/${state.user.id}/profile/image`)
          const uploadTask=uploadBytesResumable(imageRef, image)
          uploadTask.on('state_changed', 
        (snapshot:any) => {
          const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error:any) => {
          console.log(error)
        }, 
        () => {
              getDownloadURL(imageRef)
                .then((url) => {
                  setImgUrl(url);
                })})
        }
        image && uploadFile()
    }
  ,[image])
  const handleChangeImg = (e:any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitImg=(e:any)=>{
    e.preventDefault()
    updateProfile(auth.currentUser!,{
      photoURL:imgUrl
    })
      dispatch({
        type:"uploadPhoto",payload:imgUrl
      })
  }

  return (
    <Container>
    <NavbarModal/>
    <h1 className="mt-4">Profile</h1>
    <div>
    <Avatar className="mb-4" src={state.user.photoURL} sx={{width:150,height:150}}/>
    <Form onSubmit={handleSubmitImg}>
    <Form.Control type="file" onChange={handleChangeImg}/>
    <Button type="submit" className={styles.profilbtn}>Upload Image</Button>
    </Form>
    </div>
    <Card className={styles.profilecard}>
      <Card.Title className="mt-3">{state.user.name}</Card.Title>
      <Card.Text>{state.user.email}</Card.Text>
    </Card>
    </Container>
  )
}