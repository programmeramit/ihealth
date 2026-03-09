"use client"
import {prisma} from "../lib/prisma"
import { useEffect, useState } from "react"
function page() {

  useEffect(()=>{
  
    fetch('/api/users',{
      method:'GET'
    }).then((res)=>res.json()).then((data)=>console.log(data)).catch((error)=>console.log("Error while fetching the users"))


  },[])


  return (
    <div>page</div>
  )
}

export default page