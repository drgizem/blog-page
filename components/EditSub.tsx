import { Form,Button, Alert } from "react-bootstrap"
import { Subtopic } from "@/types"
import styles from "../styles/topicId.module.sass"
import { useState } from "react"

type Props={
  subtopic:Subtopic,
  onEdit:(e:any)=>void,
  handleChange:(e:any)=>void
  onChangeImg:(e:any)=>void
  onRemoveImg:()=>void
}
export const EditSub=({subtopic,handleChange,onChangeImg,onEdit,onRemoveImg}:Props)=>{
const [editImg,setEditImg]=useState(false)
const [remove,setRemove]=useState(false)

  const handleEdit=(e:any)=>{
    e.preventDefault()
    onEdit(e)
  }
const handleRemove=()=>{
  setRemove(true)
  onRemoveImg()
}
  return (
    <Form className={styles.commentForm} onSubmit={handleEdit}>
    <Form.Group>
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Your message title" onChange={handleChange} value={subtopic.title} name="title"/>
    </Form.Group>
    <Form.Group className="mt-3">
    <Form.Label>Post</Form.Label>
    <Form.Control as="textarea" rows={15} style={{}} placeholder="Write your post" onChange={handleChange} value={subtopic.message} name="message"/>
    </Form.Group>
    <Form.Group className={styles.editImg}>
    <Form.Label>Image for your post</Form.Label>
    <div style={{gap:"3px",display:"flex"}}>
    <Button className={styles.commentbtn} onClick={()=>setEditImg(true)}>Edit image</Button>
    <Button className={styles.commentbtn} onClick={handleRemove}>Remove image</Button>
    </div>
    </Form.Group>
    <div>
    {remove && <Alert className="mt-3" variant="success" dismissible onClose={()=>setRemove(false)}>Post image removed!</Alert>}
    {editImg && <Form.Control className="mt-3" type="file" placeholder="Choose your image" onChange={onChangeImg} />}
    </div>
    <Button type="submit" className={styles.commentbtn}>Edit</Button>
  </Form>
  )
}