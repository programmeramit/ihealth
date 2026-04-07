import { coloumns,Patients } from "./coloumns";
import { DataTable } from "./dataTable";
import { prisma } from "@/lib/prisma";
async function getPatients():Promise<Patients[]>{
    const data = await prisma.patient.findMany({
        select:{
            name:true,
            id:true,
            type:true
        }
    })

    return data
}

export default async function page() {

    const data = await getPatients()
    return (
        <div className="w-full h-screen">
        <div className="">
            search bar

        </div>

        <div className="mx-10">
                  <DataTable columns={coloumns} data={data} />

        </div>
        </div>
    )
    
}