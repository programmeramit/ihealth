import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const payload = {
      firstName: form.firstName as string,
      lastName: form.lastName as string,
      dob: form.dob as string,
      gender: form.gender?.toUpperCase() ,
      bloodGroup: form.bloodGroup ?? null,
      type: form.type ,
      phone: form.phone as string,
      email: form.email as string,
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      ChiefComplaint: form.ChiefComplaint ?? null,
      Symptons: form.Symptons ?? null,
      Allergies: form.Allergies ?? null,
      CurentMedicine: form.CurentMedicine ?? null,
      Department: form.Department as string,
      Priority: form.Priority ?? null,
      Reason: form.Reason ?? null,
      Ward: form.type === "IPD" ? form.Ward ?? null : null,
      BedType: form.type === "IPD" ? form.BedType ?? null : null,
      DoctorId: form.DoctorId ?? null,
    };

    const patient = await prisma.patient.create({
      data: {
        name: `${payload.firstName} ${payload.lastName}`,
        phone: payload.phone,
        address: [
  form.address,
  form.city,
  form.state,
  form.pincode,
]
  .filter(Boolean)
  .join(", "),
        dateOfBirth: new Date(payload.dob),
        Gender: payload.gender,
        type: payload.type,

        extra: {
          create: {
            BloodGroup: payload.bloodGroup,
            ChiefComplaint: payload.ChiefComplaint,
            Symptons: payload.Symptons,
            Allergies: payload.Allergies,
            CurentMedicine: payload.CurentMedicine,
            Department: payload.Department,
            Priority: payload.Priority,
            Reason: payload.Reason,
            Ward: payload.Ward,
            BedType: payload.BedType,
            DoctorId: payload.DoctorId,
          },
        },
      },
      include: {
        extra: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: patient,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}