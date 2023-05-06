export type Topic={
  topicId:string,
  title:string,
  body:string,
  subtopics:Subtopic[]
}
export type Subtopic={
  id:string,
  title:string,
  message:string
}