"use client"
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

function page() {

  return (
    <div>SignUp page
    
      <Button className="px-4" type="submit" onClick={()=>signIn("google",{redirectTo:'/'})}>Sign In with Google</Button>
    </div>
  )
}

export default page