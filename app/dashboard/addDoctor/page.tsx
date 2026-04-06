"use client";
import { toast } from "sonner"

import React, { useState } from "react";
import {
  User2, Phone, Mail, MapPin, Calendar, ChevronRight,
  Save, X, Stethoscope, GraduationCap, Clock, Building2,
  Hash, FileText,
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

interface DoctorForm {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  // Professional
  department: string;
  specialization: string;
  qualification: string;
  registrationNumber: string;
  experience: string;
  consultationFee: string;
  availableDays: string;
  shiftStart: string;
  shiftEnd: string;
  bio: string;
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

const DEPARTMENTS = [
  "Cardiology", "General Medicine", "Neurology", "Orthopedics",
  "Pediatrics", "Gynecology", "Oncology", "Emergency", "ENT", "Dermatology",
  "Psychiatry", "Radiology", "Anesthesiology", "Pathology",
];

const QUALIFICATIONS = [
  "MBBS", "MD", "MS", "DM", "MCh", "DNB", "FRCS", "MRCP", "PhD",
];

const AVAILABLE_DAYS_OPTIONS = [
  "Mon–Fri", "Mon–Sat", "Weekdays only", "Weekends only", "All days",
];

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AddDoctorPage() {
  const [form, setForm] = useState<DoctorForm>({
    firstName: "", lastName: "", dob: "", gender: "",
    phone: "", email: "", address: "", city: "", state: "", pincode: "",
    department: "", specialization: "", qualification: "",
    registrationNumber: "", experience: "", consultationFee: "",
    availableDays: "", shiftStart: "", shiftEnd: "", bio: "",
  });

  const set = (key: keyof DoctorForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) =>
      setForm((prev) => ({ ...prev, [key]: typeof e === "string" ? e : e.target.value }));

  const handleSubmit = async  () => {
    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      dob: form.dob,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      Department: form.department,
      specialization: form.specialization,
      qualification: form.qualification,
      registrationNumber: form.registrationNumber,
      experienceYears: Number(form.experience),
      consultationFee: Number(form.consultationFee),
      availableDays: form.availableDays,
      shiftStart: form.shiftStart,
      shiftEnd: form.shiftEnd,
      bio: form.bio || null,
    };
    console.log("Submitting doctor:", payload);
    // TODO: await createDoctor(payload)

    const res = fetch('/api/doctor/addDoctor/',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    },)

    const data = (await res).json()

    console.log(data)

  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8 w-full">
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>Doctors</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Add Doctor</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            New Doctor Registration
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the doctor's details below. Fields marked{" "}
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
          <CardTitle className="text-base font-semibold">Doctor Information</CardTitle>
          <CardDescription className="text-xs">
            Complete all sections to add a new doctor to the system.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* ══ Section 1: Personal Info ══ */}
          <div>
            <SectionHeader icon={User2} title="Personal Details" subtitle="Basic identifying information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FieldGroup label="First Name" icon={User2} required>
                <InputWithIcon icon={User2} placeholder="e.g. Priya" value={form.firstName} onChange={set("firstName")} />
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
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Phone Number" icon={Phone} required>
                <InputWithIcon icon={Phone} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
              </FieldGroup>

              <FieldGroup label="Email Address" icon={Mail} required>
                <InputWithIcon icon={Mail} type="email" placeholder="doctor@hospital.com" value={form.email} onChange={set("email")} />
              </FieldGroup>

              <FieldGroup label="Street Address" icon={MapPin} className="sm:col-span-2 lg:col-span-2">
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

          {/* ══ Section 2: Professional Info ══ */}
          <div>
            <SectionHeader icon={GraduationCap} title="Professional Details" subtitle="Qualifications, department and specialization" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FieldGroup label="Department" icon={Building2} required>
                <Select onValueChange={set("department")}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Specialization" icon={Stethoscope} required>
                <InputWithIcon icon={Stethoscope} placeholder="e.g. Interventional Cardiology" value={form.specialization} onChange={set("specialization")} />
              </FieldGroup>

              <FieldGroup label="Highest Qualification" icon={GraduationCap} required>
                <Select onValueChange={set("qualification")}>
                  <SelectTrigger><SelectValue placeholder="Select qualification" /></SelectTrigger>
                  <SelectContent>
                    {QUALIFICATIONS.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Registration Number" icon={Hash} required>
                <InputWithIcon icon={Hash} placeholder="e.g. MCI-12345" value={form.registrationNumber} onChange={set("registrationNumber")} />
              </FieldGroup>

              <FieldGroup label="Experience (years)" icon={Clock}>
                <InputWithIcon icon={Clock} type="number" min="0" max="60" placeholder="e.g. 10" value={form.experience} onChange={set("experience")} />
              </FieldGroup>

              <FieldGroup label="Consultation Fee (₹)">
                <Input type="number" min="0" placeholder="e.g. 500" value={form.consultationFee} onChange={set("consultationFee")} />
              </FieldGroup>
            </div>
          </div>

          <Separator />

          {/* ══ Section 3: Availability ══ */}
          <div>
            <SectionHeader icon={Clock} title="Availability & Schedule" subtitle="Working days and shift timings" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FieldGroup label="Available Days" icon={Calendar}>
                <Select onValueChange={set("availableDays")}>
                  <SelectTrigger><SelectValue placeholder="Select days" /></SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_DAYS_OPTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Shift Start" icon={Clock}>
                <InputWithIcon icon={Clock} type="time" value={form.shiftStart} onChange={set("shiftStart")} />
              </FieldGroup>

              <FieldGroup label="Shift End" icon={Clock}>
                <InputWithIcon icon={Clock} type="time" value={form.shiftEnd} onChange={set("shiftEnd")} />
              </FieldGroup>
            </div>
          </div>

          <Separator />

          {/* ══ Section 4: Bio ══ */}
          <div>
            <SectionHeader icon={FileText} title="Additional Information" subtitle="Biography and remarks" />
            <FieldGroup label="Doctor Bio / Notes" icon={FileText}>
              <Textarea
                placeholder="Brief professional biography, areas of expertise, or internal notes..."
                rows={4}
                value={form.bio}
                onChange={set("bio")}
                className="resize-none"
              />
            </FieldGroup>
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
              Add Doctor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}