import { topics } from "@/data-topics/topics"
import { Message, Topic,Subtopic,User } from "@/types"
import { useContext, useState,useEffect } from "react"
import { Button, Card,Form,Col, Row, Container } from "react-bootstrap"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { v4 as uuidv4 } from 'uuid';
import styles from "../../../styles/topicId.module.sass"
import  dayjs,{Dayjs} from 'dayjs'
import { NavbarModal } from "@/components/Navbar";
import { useRouter } from "next/router";
import { NewMessage } from "@/components/NewMessage";
import { UserContext } from "@/components/UserContext";
import { NewSubject } from "@/components/NewSubject";
import { setDoc,getDoc,doc, onSnapshot } from "firebase/firestore";
import { auth,storage} from "../../../firebase";
import {ref, uploadBytesResumable,getDownloadURL,listAll} from "firebase/storage"
import {db} from "../../../firebase"
import { Avatar } from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import { EditSub } from "@/components/EditSub";
import Image from "next/image";

type Props={
  topic:Topic
}
let now:Dayjs=dayjs()

export default function SelectTopic({topic}:Props){
  const [comments,setComments]=useState<Message[]>([])
  const [formComment,setFormComment]=useState(false)
  const [formSub,setFormSub]=useState(false)
  const [message,setMessage]=useState<Message>({} as Message)
  const router=useRouter()
  const [subtopic,setSubtopic]=useState<Subtopic>({
    id:"",
    title:"",
    message:"",
    comments:[],
    date:"",
    imageUrl:"",
    user:{name:"",photoURL:""}})
  const [subtopicList,setSubtopicList]=useState<Subtopic[]>([])
  const {state}=useContext(UserContext)
  const [userImgs,setUserImgs]=useState<File>({} as File)
  const [url,setUrl]=useState(null || "")
  const [editTopic,setEditTopic]=useState<Subtopic>({} as Subtopic)
  const [edit,setEdit]=useState(false)


  useEffect(()=>{
    if(topic.topicId !==""){
      const subtopicRef=doc(db,"topics",`${topic.topicId}`)
      const unSubscribe=onSnapshot(subtopicRef,(doc:any)=>{
        const dbList=doc.data()
        const list=dbList!.subtopics
        setSubtopicList(list)
      })
      return ()=>unSubscribe()
    } // eslint-disable-next-line
  },[])
  useEffect(()=>{
    const uploadFile=()=>{
      const storageRef=ref(storage,`${state.user.id}/posts/${uuidv4()}`)
          const uploadTask=uploadBytesResumable(storageRef, userImgs)
          uploadTask.on('state_changed', 
        (snapshot:any) => {
          const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error:any) => {
          console.log(error)
        }, 
        () => {
              userImgs.name ? getDownloadURL(storageRef)
                .then((url) => {
                  setUrl(url);
                }) : setUrl("")})
        }
        uploadFile()
    } // eslint-disable-next-line
  ,[userImgs])

  useEffect(()=>{
    if(topic.topicId !==""){
      const subtopicRef=doc(db,"topics",`${topic.topicId}`)
      const unSubscribe=onSnapshot(subtopicRef,(doc)=>{
        const dbList=doc.data()
        const list=dbList!.subtopics
        const sub=list.find((item:any)=>item.id===subtopic.id)
        sub && setComments(sub.comments)
      })
      return ()=>unSubscribe()
    } // eslint-disable-next-line
  },[subtopic])

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setMessage((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const handleChangeSub=(e:any)=>{
    const {name,value}=e.target
    setSubtopic((pre)=>{
      return {...pre,[name]:value}
    })
    setEditTopic((pre)=>{
      return {...pre,[name]:value}
    })
  }

  const handleAdd=async(e:any)=>{
    setFormComment(false)
    e.preventDefault()
    const newMessage={title:message.title,comment:message.comment,id:uuidv4(),date:now.format('HH:mm MM/DD'),user:{name:state.user.name,photoURL:state.user.photoURL},like:0,dislike:0}
    setComments((pre)=>{
      return [...pre,newMessage]
    })
    setMessage({
      id:"",
      title:"",
      comment:"",
      date:"",
      user:{name:"",photoURL:""},
      dislike:0,
      like:0
    })
    const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newList={...dbList!}
    const oldSubtopicIndex=newList.subtopics.findIndex((item:any)=>item.id===subtopic.id)
    const oldSubtopic=newList.subtopics[oldSubtopicIndex]
    const newSubtopic={...oldSubtopic,comments:[...oldSubtopic.comments,newMessage]}
    let newSubtopicList=[...newList.subtopics]
    newSubtopicList[oldSubtopicIndex]=newSubtopic
    newList.subtopics=newSubtopicList
    setDoc(subtopicRef,newList)
  }
  const changeImg=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUserImgs(e.target.files![0]) 
    
  }
  const handleAddSub=async(e:any)=>{
    e.preventDefault()
    setFormSub(false)
    const newSubject={id:uuidv4(),title:subtopic.title,message:subtopic.message,comments:[],
      imageUrl:url,date:now.format("HH:mm in MM/DD/YYYY"),user:{name:state.user.name,photoURL:state.user.photoURL}}
    setSubtopicList((pre)=>{
      return [...pre,newSubject]
    })
    setSubtopic({
      id:"",
      title:"",
      message:"",
      comments:[],
      imageUrl:"",
      date:"",user:{name:"",photoURL:""}
    })
    const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newSubList=[...dbList!.subtopics,newSubject]
    setDoc(subtopicRef,{...dbList,subtopics:newSubList})
  }
 const handleSelect=(id:string)=>{
  router.push(`/topics/${topic.topicId}?subtopic=${id}}`,undefined,{shallow:true})
  const newsub=subtopicList.find((item)=>item.id===id)
  setSubtopic(newsub!)
 }
const handleLike=async(id:string)=>{
  const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newList={...dbList!}
    const oldSubtopicIndex=newList.subtopics.findIndex((item:any)=>item.id===subtopic.id)
    const oldSubtopic=newList.subtopics[oldSubtopicIndex]
    const newSubtopic={...oldSubtopic}
    const oldCommentIndex=newSubtopic.comments.findIndex((item:any)=>item.id===id)
    const oldComment=newSubtopic.comments[oldCommentIndex]
    const newComment={...oldComment,like:oldComment.like+1}
    let newCommentList=[...newSubtopic.comments]
    newCommentList[oldCommentIndex]=newComment
    newSubtopic.comments=newCommentList
    let newSubtopicList=[...newList.subtopics]
    newSubtopicList[oldSubtopicIndex]=newSubtopic
    newList.subtopics=newSubtopicList
    setDoc(subtopicRef,newList)
}
const handleDislike=async(id:string)=>{
  const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newList={...dbList!}
    const oldSubtopicIndex=newList.subtopics.findIndex((item:any)=>item.id===subtopic.id)
    const oldSubtopic=newList.subtopics[oldSubtopicIndex]
    const newSubtopic={...oldSubtopic}
    const oldCommentIndex=newSubtopic.comments.findIndex((item:any)=>item.id===id)
    const oldComment=newSubtopic.comments[oldCommentIndex]
    const newComment={...oldComment,dislike:oldComment.dislike+1}
    let newCommentList=[...newSubtopic.comments]
    newCommentList[oldCommentIndex]=newComment
    newSubtopic.comments=newCommentList
    let newSubtopicList=[...newList.subtopics]
    newSubtopicList[oldSubtopicIndex]=newSubtopic
    newList.subtopics=newSubtopicList
    setDoc(subtopicRef,newList)
}
const handleEdit=(sub:Subtopic)=>{
  setEdit(true)
  setFormSub(false)
  setEditTopic(sub)
}
const onEdit=async(e:any)=>{
  e.preventDefault()
    const editSubject={...editTopic,title:editTopic.title,message:editTopic.message,
    date:now.format("HH:mm in MM/DD/YYYY"),imageUrl:userImgs.name ? url : editTopic.imageUrl,
      }
  subtopicList[subtopicList.findIndex((item)=>item.id===editSubject.id)]=editSubject 
  setSubtopicList((pre)=>[...pre])
  setEditTopic({
    id:"",
    title:"",
    message:"",
    comments:[],
    imageUrl:"",
    date:"",user:{name:"",photoURL:""}
  }) 
  setEdit(false)
  const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newList={...dbList!}
    const oldSubtopicIndex=newList.subtopics.findIndex((item:any)=>item.id===editTopic.id)
    const newSubtopic={...editSubject}
    let newSubtopicList=[...newList.subtopics]
    newSubtopicList[oldSubtopicIndex]=newSubtopic
    newList.subtopics=newSubtopicList
    setDoc(subtopicRef,newList)
}
const onRemove=async()=>{
  setEditTopic((pre)=>{
    return {...pre,imageUrl:""}
  })
  const subtopicRef=doc(db,"topics",`${topic.topicId}`)
    const listRef=await getDoc(subtopicRef)
    const dbList=listRef.data()
    const newList={...dbList!}
    const oldSubtopicIndex=newList.subtopics.findIndex((item:any)=>item.id===editTopic.id)
    const oldSubtopic=newList.subtopics[oldSubtopicIndex]
    const newSubtopic={...oldSubtopic,imageUrl:""}
    let newSubtopicList=[...newList.subtopics]
    newSubtopicList[oldSubtopicIndex]=newSubtopic
    newList.subtopics=newSubtopicList
    setDoc(subtopicRef,newList)
}
  return (
    <>
    <Container>
    <NavbarModal />
    {subtopic.id !=="" ? <Row className={styles.article}>
    <h1>{subtopic.title}</h1>
    {subtopic.imageUrl !=="" && <Image src={subtopic.imageUrl} alt="" className={styles.articleimage}/>}
    <div className={styles.articleuser}>
    <Avatar className="mt-3" src={subtopic.user.photoURL}/>
    <p>{subtopic.user.name}</p>
    <p className={styles.articledate}>{subtopic.date}</p>
    </div>
    <p style={{whiteSpace:"pre-wrap"}}>{subtopic.message}</p>
    <Button className={styles.commentbtn} onClick={()=>setFormComment(true)}>Write a comment</Button>
    <Row className="mt-5">{formComment && <NewMessage handleAdd={handleAdd} handleChange={handleChange} message={message}/>}</Row>
  {comments.map((comment)=>{
      return <Card key={comment.id} className={styles.commentCard}>
        <Row>
        <Col xs={2}>
         <Avatar className="mt-3" src={comment.user.photoURL}/>
         <div className="mt-3">{comment.user.name}</div>
        </Col>
        <Col>
        <div className={styles.commentTitle}>
        <Card.Title>{comment.title}</Card.Title>
        <p className={styles.commentTime}>{comment.date}</p></div>
        <Card.Text>
          {comment.comment}
        </Card.Text>
        <Row className={styles.likediv}>
        <Col className={styles.likebtn}>
        <ThumbUpAltIcon onClick={()=>handleLike(comment.id)}/>
        <p>{comment.like}</p>
        </Col>
        < Col className={styles.likebtn}>
        <ThumbDownAltIcon onClick={()=>handleDislike(comment.id)}/>
        <p>{comment.dislike}</p>
        </Col>
        </Row>
        </Col>
        </Row>
      </Card>
    })}
    </Row> : <>
    <Row className={styles.article}>
    <h1>{topic.title}</h1>
    <p>{topic.body}</p>
    <Link href={state.user.name ==="" ? "/signin" : `/topics/${topic.topicId}`}><Button className={styles.articlebtn} onClick={()=>setFormSub(true)}>Create a new subject</Button></Link>
    {formSub && <NewSubject handleAdd={handleAddSub} onChangeImg={changeImg} handleChange={handleChangeSub} subtopic={subtopic}/>}
    {edit && <EditSub subtopic={editTopic} onChangeImg={changeImg} onRemoveImg={onRemove} onEdit={onEdit} handleChange={handleChangeSub}/>}
    </Row>
  {subtopicList.map((sub)=>{
    return  <Card className={styles.commentCard} key={sub.id}>
    <Card.Body>
      <Card.Title>{sub.title}</Card.Title>
      <Card.Text className={styles.commenttext}>Created at {sub.date}</Card.Text>
      <Card.Link className={styles.cardlink} href={state.user.name ==="" ? "/signin" : undefined} onClick={()=>handleSelect(sub.id)}>Details</Card.Link>
    {sub.user.name=== state.user.name && <EditIcon className="mx-4" onClick={()=>handleEdit(sub)}/>}
    </Card.Body>
  </Card>
  })}</>}
    </Container>
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