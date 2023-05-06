import type { NextApiRequest, NextApiResponse } from 'next'
import { topics} from '@/data-topics/topics'
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse){
    if(req.method==="GET"){
      res.status(200).json(topics)
    }
}