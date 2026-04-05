"use server"

import {prisma} from "../lib/prisma"

export async function createPatients(data:{
    name:string,
    phone:string
}){
   await prisma.patient.create({
  data: {
    name: data.name,
    phone: data.phone,
    address: "Some address",
    dateOfBirth: new Date("2000-01-01"),
    Gender: "MALE", // or whatever enum/value you defined
  }
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