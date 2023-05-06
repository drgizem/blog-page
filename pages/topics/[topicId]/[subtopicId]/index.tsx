import { topics } from "@/data-topics/topics"
import { Subtopic, Topic } from "@/types"
import { useRouter } from "next/router"

type Props={
  subtopic:Subtopic
}
export default function Subtopic({subtopic}:Props){
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

    return (
      <div>
        <div><h1>{subtopic?.title}</h1>
        <p>{subtopic?.message}</p></div>
      </div>
    )
}

export async function getStaticProps(context:any){
  const {params}=context
  const {topicId}=params
  const {subtopicId}=topicId
  const topic=topics.find((topic)=>topic.topicId===topicId)
  const subtopic=topic?.subtopics.find((sub)=>sub.id===subtopicId)
  if (!subtopic!.id) {
    return {
      notFound: true
    }
  }
  return {
    props:{
      subtopic
    }
  }
}

export async function getStaticPaths(topic:Topic){
  if(topic.subtopics){
    const paths=topic.subtopics.map((subtopic)=>{
      return {
        params:{subtopicId:`${subtopic.id}`}
      }
    })
    return {
      paths,
      fallback:true
    }
  }else {
    return {
      paths:[],
      fallback:true
    }
  }
  
}