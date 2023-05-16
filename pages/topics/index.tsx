import { NavbarModal } from "@/components/Navbar"
import { TopicCard } from "@/components/TopicCard"
import { Topic } from "@/types"
import { useState,useEffect } from "react"
import styles from "../../styles/topics.module.sass"
import { Container, Row } from "react-bootstrap"



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
  <Container>
  <NavbarModal/>
  <Row>
  {topics.map((topic)=>{
      return (
        <TopicCard key={topic.topicId} topic={topic}/>
      )
    })}
  </Row>
  </Container>
  
  </>)
}