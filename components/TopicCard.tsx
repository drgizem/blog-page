import { Topic } from "@/types"
import { Card } from "react-bootstrap"
import styles from "../styles/topics.module.sass"

type Props={
  topic:Topic
}
export const TopicCard=({topic}:Props)=>{

  return <>
  <Card className={styles.topicCard}>
      <Card.Body>
        <Card.Title>{topic.title}</Card.Title>
        <Card.Text>
          {topic.body}
        </Card.Text>
        <Card.Link href={`/topics/${topic.topicId}`} className={styles.topiclink}>Details</Card.Link>
      </Card.Body>
    </Card>
  </>
}