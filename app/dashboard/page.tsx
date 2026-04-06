"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




function page() {

  const {data} = useSession()
  const sign = async()=>{
      await signIn("google")
  }



  return (
      <>
     <div>
        Welcome {data?.user?.name}

      <Button onClick={sign}>signin </Button>
      <Avatar>
  <AvatarImage src={data?.user && data?.user?.image || ""} />
  <AvatarFallback>{data?.user?.name}</AvatarFallback>
</Avatar>
    </div> 
      

   
    </>
  )
}

export default page