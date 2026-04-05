import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "./lib/prisma"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:PrismaAdapter(prisma),
  providers: [Resend,
     Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks:{
    async signIn({account,profile}){
      if(account?.provider === "google"){
        console.log(account,profile)
        return profile?.email_verified && profile.email?.endsWith('@gmail.com')
      }
      return true
    },
  }
})