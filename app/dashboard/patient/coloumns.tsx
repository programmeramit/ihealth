"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Patients = {
    id:string,
    name:string,
    type:string,
    Gender:"MALE" | "FEMALE",
    address:string,
    dateofBirth:Date,
    DoctorId:string

}

import { MoreHorizontal } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const coloumns:ColumnDef<Patients>[] = [
   {
    accessorKey: "id",
    header:() => <div className="font-bold ">ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold ">Name</div>,
  },
  {
    accessorKey: "type",
    header:() => <div className="font-bold ">Type</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem >

               <Dialog>
  <DialogTrigger asChild>
    <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>Edit</DropdownMenuItem>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogDescription>
        hello world
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
