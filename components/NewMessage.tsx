import { Message } from "@/types"
import { Form,Button } from "react-bootstrap"
import styles from "../styles/topicId.module.sass"

type Props={
  message:Message,
  handleAdd:(e:any)=>void,
  handleChange:(e:any)=>void
}
export const NewMessage=({message,handleAdd,handleChange}:Props)=>{
  return(<Form className={styles.commentForm} onSubmit={handleAdd}>
    <Form.Group>
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Your message title" onChange={handleChange} value={message.title || ""} name="title"/>
    </Form.Group>
    <Form.Group className="mt-3">
    <Form.Label>Comment</Form.Label>
    <Form.Control as="textarea" rows={15} placeholder="Write your comment" onChange={handleChange} value={message.comment || ""} name="comment"/>
    </Form.Group>
    <Button type="submit" className={styles.commentbtn}>Submit</Button>
  </Form>)
}