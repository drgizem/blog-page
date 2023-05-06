import { NavbarModal } from "@/components/Navbar"
import { TopicCard } from "@/components/TopicCard"
import { Topic } from "@/types"
import { useState,useEffect } from "react"


export default function Topics(){
  const [topics,setTopics]=useState<Topic[]>([])

  useEffect(()=>{
    const fetchTopic=async()=>{
      const response=await fetch("/api/topics")
      const data=await response.json()
      setTopics(data)
    }
    fetchTopic()
  },[])
  return (<>
  <NavbarModal/>
    {topics.map((topic)=>{
      return (
      <div key={topic.topicId}>
        <TopicCard topic={topic}/>
      </div>   
      )
    })}
  </>)
}