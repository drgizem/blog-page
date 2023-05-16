import { User } from "@/types"
import { createContext, useEffect, useReducer, useState } from "react"
import { UserReducer } from "./UserReducer"



export type InitialStateType={
  user:User
}
export const INITIAL_STATE:InitialStateType={
  user:{
    name:"",
    id:"",
    email:"",
    photoURL:""
  }
} 
export const UserContext=createContext<{
  state:InitialStateType,
  dispatch:React.Dispatch<any>
}>({
  state: INITIAL_STATE,
  dispatch: () => null
})
const initialFromLocalStorage:any=()=>{
  if(typeof window !=="undefined"){
    const result=localStorage.getItem("user")
    if(result){
      return JSON.parse(result) as InitialStateType
    }
  }
  return INITIAL_STATE
}
export const UserContextProvider=({children}:{ children: React.ReactNode })=>{
  const [state,dispatch]=useReducer(UserReducer,initialFromLocalStorage())
  const [user,setUser]=useState(false)

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state))
  },[state])
  useEffect(()=>{
      setUser(true)
  },[])
  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{dispatch,state}}>{children}</UserContext.Provider>
  )
}