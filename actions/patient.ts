"use server"

import { number } from "framer-motion"
import {prisma} from "../lib/prisma"

export async function createPatients(data:{
    name:string,
    phone:string
}){
    return await prisma.patient.create({
        data:data
    })
}

export async function getDetails(id:string){
    return await prisma.patient.findUnique({
     where:{
        id:id
     },
     select:{
        name:true,
        phone:true
     }   
    })
}