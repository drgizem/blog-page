import type { NextApiRequest, NextApiResponse } from 'next'
import { topics } from '@/data-topics/topics'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse){
    const {topicId}=req.query
    if(req.method==="GET"){
      const topic=topics.find((topic)=>topic.topicId===topicId)
      res.status(200).json(topic)
    }
}