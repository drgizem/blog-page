import { Topic } from "@/types"
import { Card } from "react-bootstrap"

type Props={
  topic:Topic
}
export const TopicCard=({topic}:Props)=>{

  return <>
  <Card >
      <Card.Body>
        <Card.Title>{topic.title}</Card.Title>
        <Card.Text>
          {topic.body}
        </Card.Text>
        <Card.Link href={`/topics/${topic.topicId}`}>Details</Card.Link>
      </Card.Body>
    </Card>
  </>
}