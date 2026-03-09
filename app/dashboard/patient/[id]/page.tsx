"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/actions/patient";

function Page() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const details = await getDetails(id as string);
        setPatient(details);
      } catch (err) {
        console.log(`Error finding the details ${err}`);
      }
    }

    if (id) fetchPatient();
  }, [id]);

  console.log(patient);

  return (
    <div>
      <h1>Patient ID: {id}</h1>
      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </div>
  );
}

export default Page;