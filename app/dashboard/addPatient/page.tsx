"use client";

import React, { useState ,useEffect} from "react";
import {
  User2, Phone, Mail, MapPin, Calendar, Droplets,
  FileText, Stethoscope, ChevronRight, Save, X,
  AlertTriangle, Pill, Building2, BedDouble, ClipboardList,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PatientForm {
  // Personal
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  type: string; // IPD | OPD
  // Contact
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  // Clinical — Prisma schema fields
  ChiefComplaint: string;
  Symptons: string;
  Allergies: string;
  CurentMedicine: string;
  Department: string;
  Priority: string;
  Reason: string;
  Ward: string;
  BedType: string;
  DoctorId: string;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldGroup({
  label, icon: Icon, required, children, className = "",
}: {
  label: string; icon?: React.ElementType; required?: boolean;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

function InputWithIcon({ icon: Icon, ...props }: { icon?: React.ElementType; [key: string]: any }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      )}
      <Input className={Icon ? "pl-9" : ""} {...props} />
    </div>
  );
}

function SectionHeader({
  icon: Icon, title, subtitle,
}: {
  icon: React.ElementType; title: string; subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────

const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

const DEPARTMENTS = [
  "Cardiology", "General Medicine", "Neurology", "Orthopedics",
  "Pediatrics", "Gynecology", "Oncology", "Emergency", "ENT", "Dermatology",
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"];

const BED_TYPES = ["General", "Semi-Private", "Private", "ICU", "HDU", "NICU"];

const WARDS = ["Ward A", "Ward B", "Ward C", "ICU", "HDU", "Maternity", "Pediatric"];

// ── Sample doctors (replace with API fetch) ───────────────────────────────────

const DOCTORS = [
  { id: "dr-001", name: "Dr. Priya Sharma", department: "Cardiology" },
  { id: "dr-002", name: "Dr. Amit Patel", department: "General Medicine" },
  { id: "dr-003", name: "Dr. Sunita Mehta", department: "Neurology" },
  { id: "dr-004", name: "Dr. Rajesh Kumar", department: "Orthopedics" },
];

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AddPatientPage() {


  const [form, setForm] = useState<PatientForm>({
    firstName: "", lastName: "", dob: "", gender: "", bloodGroup: "", type: "",
    phone: "", email: "", address: "", city: "", state: "", pincode: "",
    ChiefComplaint: "", Symptons: "", Allergies: "", CurentMedicine: "",
    Department: "", Priority: "", Reason: "", Ward: "", BedType: "", DoctorId: "",
  });
  const [doctors,setdoctor] = useState<any[ ]>([])

    useEffect(()=>{
        
        fetch('/api/doctor/addDoctor/',{
            method:'GET'
        }).then((res)=>res.json()).then((res)=>
            {setdoctor(res.doctors)}).catch((err)=>console.log(err))



    },[])



  const set = (key: keyof PatientForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) =>
      setForm((prev) => ({ ...prev, [key]: typeof e === "string" ? e : e.target.value }));

  const handleSubmit = () => {
    // Map form to Prisma-compatible payload
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      gender: form.gender,
      bloodGroup: form.bloodGroup,
      type: form.type,
      phone: form.phone,
      email: form.email,
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      ChiefComplaint: form.ChiefComplaint || null,
      Symptons: form.Symptons || null,
      Allergies: form.Allergies || null,
      CurentMedicine: form.CurentMedicine || null,
      Department: form.Department,
      Priority: form.Priority || null,
      Reason: form.Reason || null,
      Ward: form.type === "IPD" ? (form.Ward || null) : null,
      BedType: form.type === "IPD" ? (form.BedType || null) : null,
      DoctorId: form.DoctorId || null,
    };
    console.log("Submitting patient:", payload);
    // TODO: await createPatient(payload)

     fetch('/api/patient/',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    },).then(()=>console.log("Succesfully added"))



  };

  const isIPD = form.type === "IPD";

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8 w-full">
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>Patients</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Add Patient</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            New Patient Registration
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the patient details below. Fields marked{" "}
            <span className="text-destructive font-medium">*</span> are required.
          </p>
        </div>
        <Badge variant="outline" className="hidden md:flex gap-1.5 text-xs">
          <Stethoscope className="h-3 w-3" />
          MediCare HMS
        </Badge>
      </div>

      {/* ── Form card ── */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Patient Information</CardTitle>
          <CardDescription className="text-xs">
            Complete all sections to register a new patient in the system.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* ══ Section 1: Personal Info ══ */}
          <div>
            <SectionHeader icon={User2} title="Personal Details" subtitle="Basic identifying information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FieldGroup label="First Name" icon={User2} required>
                <InputWithIcon icon={User2} placeholder="e.g. Rahul" value={form.firstName} onChange={set("firstName")} />
              </FieldGroup>

              <FieldGroup label="Last Name" required>
                <Input placeholder="e.g. Sharma" value={form.lastName} onChange={set("lastName")} />
              </FieldGroup>

              <FieldGroup label="Date of Birth" icon={Calendar} required>
                <InputWithIcon icon={Calendar} type="date" value={form.dob} onChange={set("dob")} />
              </FieldGroup>

              <FieldGroup label="Gender" required>
                <Select onValueChange={set("gender")}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Patient Type" required>
                <Select onValueChange={set("type")}>
                  <SelectTrigger><SelectValue placeholder="IPD / OPD" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IPD">IPD — In-Patient</SelectItem>
                    <SelectItem value="OPD">OPD — Out-Patient</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Blood Group" icon={Droplets}>
                <Select onValueChange={set("bloodGroup")}>
                  <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Department" icon={Building2} required>
                <Select onValueChange={set("Department")}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Assigned Doctor" icon={Stethoscope}>
                <Select onValueChange={set("DoctorId")}>
                  <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                  <SelectContent>
                    {doctors.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name} — {d.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Priority" icon={AlertTriangle}>
                <Select onValueChange={set("Priority")}>
                  <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              {/* IPD-only fields */}
              {isIPD && (
                <>
                  <FieldGroup label="Ward" icon={BedDouble}>
                    <Select onValueChange={set("Ward")}>
                      <SelectTrigger><SelectValue placeholder="Select ward" /></SelectTrigger>
                      <SelectContent>
                        {WARDS.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>

                  <FieldGroup label="Bed Type" icon={BedDouble}>
                    <Select onValueChange={set("BedType")}>
                      <SelectTrigger><SelectValue placeholder="Select bed type" /></SelectTrigger>
                      <SelectContent>
                        {BED_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* ══ Section 2: Contact Info ══ */}
          <div>
            <SectionHeader icon={Phone} title="Contact Information" subtitle="Phone, email and address details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Phone Number" icon={Phone} required>
                <InputWithIcon icon={Phone} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
              </FieldGroup>

              <FieldGroup label="Email Address" icon={Mail}>
                <InputWithIcon icon={Mail} type="email" placeholder="rahul@example.com" value={form.email} onChange={set("email")} />
              </FieldGroup>

              <FieldGroup label="Street Address" icon={MapPin} className="sm:col-span-2">
                <InputWithIcon icon={MapPin} placeholder="House / Flat no., Street, Locality" value={form.address} onChange={set("address")} />
              </FieldGroup>

              <FieldGroup label="City" required>
                <Input placeholder="e.g. Bokaro" value={form.city} onChange={set("city")} />
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup label="State" required>
                  <Input placeholder="e.g. Jharkhand" value={form.state} onChange={set("state")} />
                </FieldGroup>
                <FieldGroup label="PIN Code">
                  <Input placeholder="827001" maxLength={6} value={form.pincode} onChange={set("pincode")} />
                </FieldGroup>
              </div>
            </div>
          </div>

          <Separator />

          {/* ══ Section 3: Clinical Info (Prisma schema fields) ══ */}
          <div>
            <SectionHeader icon={FileText} title="Clinical Information" subtitle="Chief complaint, symptoms, medications and notes" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Chief Complaint" icon={ClipboardList}>
                <InputWithIcon
                  icon={ClipboardList}
                  placeholder="e.g. Chest pain since 2 days"
                  value={form.ChiefComplaint}
                  onChange={set("ChiefComplaint")}
                />
              </FieldGroup>

              <FieldGroup label="Known Allergies" icon={AlertTriangle}>
                <InputWithIcon
                  icon={AlertTriangle}
                  placeholder="e.g. Penicillin, Sulfa drugs"
                  value={form.Allergies}
                  onChange={set("Allergies")}
                />
              </FieldGroup>

              <FieldGroup label="Current Medications" icon={Pill}>
                <InputWithIcon
                  icon={Pill}
                  placeholder="e.g. Metformin 500mg, Amlodipine 5mg"
                  value={form.CurentMedicine}
                  onChange={set("CurentMedicine")}
                />
              </FieldGroup>

              <FieldGroup label="Reason for Visit" icon={FileText}>
                <InputWithIcon
                  icon={FileText}
                  placeholder="e.g. Routine check-up / Emergency"
                  value={form.Reason}
                  onChange={set("Reason")}
                />
              </FieldGroup>

              <FieldGroup label="Symptoms" className="sm:col-span-2">
                <Textarea
                  placeholder="Describe symptoms in detail — duration, severity, associated factors..."
                  rows={3}
                  value={form.Symptons}
                  onChange={set("Symptons")}
                  className="resize-none"
                />
              </FieldGroup>
            </div>
          </div>

          <Separator />

          {/* ══ Action buttons ══ */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-1">
            <Button variant="ghost" className="w-full sm:w-auto gap-2 text-muted-foreground">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Save as Draft
            </Button>
            <Button className="w-full sm:w-auto gap-2" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              Register Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}