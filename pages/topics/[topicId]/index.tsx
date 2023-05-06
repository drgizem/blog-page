import { topics } from "@/data-topics/topics"
import { Topic } from "@/types"
import { Card } from "react-bootstrap"

type Props={
  topic:Topic
}

export default function SelectTopic({topic}:Props){
  return (
    <>
    <h1>{topic.title}</h1>
    <p>{topic.body}</p>
    {topic.subtopics.map((sub)=>{
      return (<Card >
      <Card.Body>
        <Card.Title>{sub.title}</Card.Title>
        <Card.Link href={`/topics/${topic.topicId}/${sub.id}`}>See messagges and details</Card.Link>
      </Card.Body>
    </Card>)
    })}
    </>
  )
}

export async function getStaticProps(context:any){
  const {params}=context
  const {topicId}=params
  const topic=topics.find((topic)=>topic.topicId===topicId)

  return {
    props:{
      topic
    }
  }
}
export async function getStaticPaths(){
  const paths=topics.map((topic)=>{
    return {
      params:{topicId:`${topic.topicId}`}
    }
  })
  return {
    paths,
    fallback:false
  }
}