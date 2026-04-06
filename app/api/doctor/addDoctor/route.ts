import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.json();

    const doctor = await prisma.doctor.create({
      data: {
        name: form.name,
        phone: form.phone,
        gender: form.gender,
        dob: new Date(form.dob),

        specialization: form.specialization,
        qualification: form.qualification,
        experience: Number(form.experienceYears),

        licenseNumber: form.registrationNumber,
        hospitalName: null,

        consultationFee: Number(form.consultationFee),

        availableFrom: form.shiftStart,
        availableTo: form.shiftEnd,

        workingDays: form.availableDays,

        bio: form.bio || null,
        profileImage: null,

        isActive: true,
      },
    });

    return NextResponse.json(
      { message: "Doctor created successfully", data: doctor },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET(req:Request){

  const doctors = await prisma.doctor.findMany()

  return NextResponse.json(
    {
      doctors:doctors
    }
  )
}