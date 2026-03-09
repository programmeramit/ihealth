"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { addToast, ToastProvider } from "@heroui/toast";
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@heroui/react";
import { createPatients, getDetails } from '@/actions/patient';

function page() {
  //Types
  type Patient = {
  name: string
  phone: string
} 


  const { data: session } = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setname] = useState("")
  const [number, setnumber] = useState("")

  //Details about the patient

  const [patients, setpatients] = useState<Patient | []>([])

  useEffect(() => {
  const fetchDetails = async () => {
    try {
      if (session?.user?.id) {
        const data = await getDetails(session?.user?.id)
        console.log("tried")
        setpatients(data)
      }
    } catch (e) {
      console.log(`Error while fetching the user`, e)
    }
  }

  // Call the function here
  fetchDetails()

}, [])

  const router = useRouter();


  const makePatient = async (name: string, number: string) => {
    const user = await createPatients({
      name: name,
      phone: number
    })
    addToast({
      title: "Created Patient Successfully",
      description: `Created ${name} patient`,
      color: "success",
    })

    router.push(`/dashboard/patient/${user.id}`)



  }


  return (
    <>
      <div>
        <h1>
          Welcome {session?.user?.name}
        </h1>
        <Button color="success" onPress={onOpen} style={{
          color: 'white'
        }}>
          Create Patient
        </Button>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <p>Name of Patient</p>
                <Input type="text" name='text' onChange={(e) => setname(e.target.value)} />
                <p>Phone Number</p>
                <Input type="number" maxLength={10} name='text' onChange={(e) => setnumber(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { makePatient(name, number); onClose }}>
                  Create Patient
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {
              // Data Format is {name:'any_name',active:'',amount:'',phonenumber:''}
            }

          
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </div>
    </>
  )
}

export default page