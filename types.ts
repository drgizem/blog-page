export type Topic={
  topicId:string,
  title:string,
  body:string,
  subtopics:Subtopic[]
}
export type Subtopic={
  id:string,
  title:string,
  message:string,
  comments:Message[],
  date:string,
  imageUrl:string,
  user:{name:string,photoURL:string}
}
export type Message={
  id:string,
  title:string,
  comment:string,
  date:string,
  user:{name:string,photoURL:string},
  like:number,
  dislike:number
}
export type User={
  name:string,
  id:string,
  email:string,
  photoURL:string,
}