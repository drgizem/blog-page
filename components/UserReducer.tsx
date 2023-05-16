import { User } from "@/types"
import { InitialStateType } from "./UserContext";

type ContextAction=
| {type:"uploadPhoto" ;payload:string}
| {type:"login" | "logout";payload:User}

export const UserReducer=(state:InitialStateType,action:ContextAction)=>{
  switch(action.type){
    case "login":
      return {user:action.payload}
    case "logout":
      return {user:{name:"",id:"",email:"",photoURL:""}}
    case "uploadPhoto":
      return {user:{...state.user,photoURL:action.payload}}
      default:
      return state
  }

}