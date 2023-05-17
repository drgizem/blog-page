import { Subtopic } from "@/types"
import { Form,Button } from "react-bootstrap"
import styles from "../styles/topicId.module.sass"
import { useState } from "react"

type Props={
  subtopic:Subtopic,
  handleAdd:(e:any)=>void,
  handleChange:(e:any)=>void
  onChangeImg:(e:any)=>void
}
export const NewSubject=({subtopic,handleAdd,handleChange,onChangeImg}:Props)=>{
  const [validate,setValidated]=useState(false)

  const handleSubmit=(e:any)=>{
    e.preventDefault()
    handleAdd(e)
  }

  return(<Form validated={validate} className={styles.commentForm} onSubmit={handleSubmit}>
    <Form.Group>
    <Form.Label>Title</Form.Label>
    <Form.Control required type="text" placeholder="Your message title" onChange={handleChange} value={subtopic.title || ""} name="title"/>
    </Form.Group>
    <Form.Group className="mt-3">
    <Form.Label>Post</Form.Label>
    <Form.Control required as="textarea" rows={15} style={{}} placeholder="Write your post" onChange={handleChange} value={subtopic.message || ""} name="message"/>
    </Form.Group>
    <Form.Group className="mt-3">
    <Form.Label>Image for your post</Form.Label>
    <Form.Control type="file" placeholder="Choose your image" onChange={onChangeImg}/>
    </Form.Group>
    <Button type="submit" className={styles.commentbtn} onClick={()=>setValidated(true)}>Submit</Button>
  </Form>)
}