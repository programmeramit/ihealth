"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import {
  UserPlus,
  Search,
  Stethoscope,
  BedDouble,
  ChevronRight,
  ChevronLeft,
  User,
  AlertCircle,
  ClipboardList,
  Activity,
  Building2,
  CheckCircle2,
} from "lucide-react"

import { createPatients, getDetails } from "@/actions/patient"

// ─── Types ────────────────────────────────────────────────────────────────────

type VisitType = "OPD" | "IPD"

type OPDFormInputs = {
  firstName: string
  lastName: string
  dob: string
  gender: "male" | "female" | "other"
  bloodGroup: string
  phone: string
  emergencyContact: string
  address: string
  chiefComplaint: string
  symptoms: string
  allergies: string
  currentMedications: string
  department: string
  doctor: string
  appointmentType: "walk-in" | "scheduled"
  priority: "normal" | "urgent" | "critical"
}

type IPDFormInputs = OPDFormInputs & {
  ward: string
  bedType: "general" | "semi-private" | "private" | "icu"
  attendantName: string
  attendantRelation: string
  admissionReason: string
  estimatedStay: string
  insuranceProvider: string
  insurancePolicyNo: string
}

type Patient = {
  id?: string
  name?: string
  firstName?: string
  lastName?: string
  phone: string
  visitType?: VisitType
  status?: "waiting" | "in-consultation" | "admitted" | "discharged"
  department?: string
  createdAt?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const OPD_STEPS = ["Personal Info", "Clinical Details", "Visit Setup"]
const IPD_STEPS = ["Personal Info", "Clinical Details", "Admission Details", "Insurance"]

const DEPARTMENTS = [
  "General Medicine", "Cardiology", "Orthopedics", "Neurology",
  "Pediatrics", "Gynecology", "ENT", "Dermatology", "Ophthalmology", "Psychiatry",
]
const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"]
const WARDS = [
  "General Ward", "Medical Ward", "Surgical Ward", "Maternity Ward",
  "Pediatric Ward", "ICU", "CCU", "HDU",
]

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  waiting:           { label: "Waiting",    color: "#BA7517", bg: "#FAEEDA" },
  "in-consultation": { label: "Consulting", color: "#185FA5", bg: "#E6F1FB" },
  admitted:          { label: "Admitted",   color: "#0F6E56", bg: "#E1F5EE" },
  discharged:        { label: "Discharged", color: "#5F5E5A", bg: "#F1EFE8" },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                i < current
                  ? "bg-primary text-primary-foreground"
                  : i === current
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium whitespace-nowrap ${
                i === current ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 mb-4 transition-colors duration-300 ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/70">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-[11px] text-destructive flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
        <Icon size={13} className="text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  )
}

// ─── OPD Multi-step Form ──────────────────────────────────────────────────────

function OPDForm({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState(0)
  // BUG FIX: Track Select values separately since they bypass `register`
  const [selectValues, setSelectValues] = useState<Partial<OPDFormInputs>>({
    gender: undefined,
    bloodGroup: undefined,
    department: undefined,
    appointmentType: "walk-in",
    priority: "normal",
  })
  const [selectErrors, setSelectErrors] = useState<Partial<Record<keyof OPDFormInputs, string>>>({})
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<OPDFormInputs>()

  const setSelect = (field: keyof OPDFormInputs, value: string) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }))
    // Clear error on change
    setSelectErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // BUG FIX: Validate Select fields manually per step
  const validateSelectsForStep = (s: number): boolean => {
    const newErrors: Partial<Record<keyof OPDFormInputs, string>> = {}
    if (s === 0 && !selectValues.gender) newErrors.gender = "Required"
    if (s === 2 && !selectValues.department) newErrors.department = "Required"
    if (Object.keys(newErrors).length > 0) {
      setSelectErrors(newErrors)
      return false
    }
    return true
  }

  const nextStep = async () => {
    const fields: (keyof OPDFormInputs)[][] = [
      ["firstName", "lastName", "phone", "dob"],
      ["chiefComplaint"],
      [],
    ]
    const [rhfValid, selectValid] = await Promise.all([
      trigger(fields[step]),
      Promise.resolve(validateSelectsForStep(step)),
    ])
    if (rhfValid && selectValid) setStep((s) => s + 1)
  }

  const onSubmit: SubmitHandler<OPDFormInputs> = async (data) => {
    if (!validateSelectsForStep(step)) return
    const fullData = { ...data, ...selectValues }
    console.log("=== OPD PATIENT FULL DATA ===", fullData)
    try {
      const user = await createPatients({
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        visitType: "OPD",
        department: selectValues.department,
        gender: selectValues.gender,
        bloodGroup: selectValues.bloodGroup,
        dob: data.dob,
        address: data.address,
        emergencyContact: data.emergencyContact,
        chiefComplaint: data.chiefComplaint,
        symptoms: data.symptoms,
        allergies: data.allergies,
        currentMedications: data.currentMedications,
        doctor: data.doctor,
        appointmentType: selectValues.appointmentType ?? "walk-in",
        priority: selectValues.priority ?? "normal",
      })
      console.log("=== CREATED PATIENT RESPONSE ===", user)
      toast.success("OPD Patient Registered", {
        description: `Token issued for ${data.firstName} ${data.lastName}`,
      })
      onSuccess()
      router.push(`/dashboard/patient/${user.id}`)
    } catch (err) {
      console.error("=== OPD REGISTRATION ERROR ===", err)
      toast.error("Registration failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator steps={OPD_STEPS} current={step} />

      {/* Step 0 — Personal Info */}
      {step === 0 && (
        <div className="space-y-4">
          <SectionTitle icon={User} title="Personal Information" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name" required error={errors.firstName?.message}>
              <Input
                placeholder="Rahul"
                {...register("firstName", { required: "Required" })}
                className="h-9 text-sm"
              />
            </FormField>
            <FormField label="Last Name" required error={errors.lastName?.message}>
              <Input
                placeholder="Sharma"
                {...register("lastName", { required: "Required" })}
                className="h-9 text-sm"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date of Birth" required error={errors.dob?.message}>
              <Input
                type="date"
                {...register("dob", { required: "Required" })}
                className="h-9 text-sm"
              />
            </FormField>
            {/* BUG FIX: Use selectErrors for Select-based fields */}
            <FormField label="Gender" required error={selectErrors.gender}>
              <Select onValueChange={(v) => setSelect("gender", v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Phone Number" required error={errors.phone?.message}>
              <Input
                placeholder="+91 98765 43210"
                {...register("phone", {
                  required: "Required",
                  pattern: { value: /^[0-9+\s-]{10,}$/, message: "Invalid number" },
                })}
                className="h-9 text-sm"
              />
            </FormField>
            <FormField label="Blood Group">
              <Select onValueChange={(v) => setSelect("bloodGroup", v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((bg) => (
                    <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <FormField label="Emergency Contact">
            <Input
              placeholder="+91 XXXXX XXXXX"
              {...register("emergencyContact")}
              className="h-9 text-sm"
            />
          </FormField>
          <FormField label="Address">
            <Textarea
              placeholder="House No., Street, City, State"
              {...register("address")}
              className="text-sm resize-none"
              rows={2}
            />
          </FormField>
        </div>
      )}

      {/* Step 1 — Clinical Details */}
      {step === 1 && (
        <div className="space-y-4">
          <SectionTitle icon={Activity} title="Clinical Information" />
          <FormField label="Chief Complaint" required error={errors.chiefComplaint?.message}>
            <Textarea
              placeholder="Describe main symptoms or reason for visit..."
              {...register("chiefComplaint", { required: "Required" })}
              className="text-sm resize-none"
              rows={3}
            />
          </FormField>
          <FormField label="Symptoms">
            <Textarea
              placeholder="Fever, headache, nausea... (separate with commas)"
              {...register("symptoms")}
              className="text-sm resize-none"
              rows={2}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Known Allergies">
              <Input placeholder="Penicillin, Sulfa..." {...register("allergies")} className="h-9 text-sm" />
            </FormField>
            <FormField label="Current Medications">
              <Input placeholder="Metformin 500mg..." {...register("currentMedications")} className="h-9 text-sm" />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 2 — Visit Setup */}
      {step === 2 && (
        <div className="space-y-4">
          <SectionTitle icon={ClipboardList} title="Visit Details" />
          <FormField label="Department" required error={selectErrors.department}>
            <Select onValueChange={(v) => setSelect("department", v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Doctor (optional)">
            <Input
              placeholder="Dr. Name or leave blank for auto-assign"
              {...register("doctor")}
              className="h-9 text-sm"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Appointment Type">
              <Select
                defaultValue="walk-in"
                onValueChange={(v) => setSelect("appointmentType", v)}
              >
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk-in">Walk-in</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Priority">
              <Select
                defaultValue="normal"
                onValueChange={(v) => setSelect("priority", v)}
              >
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="gap-1"
        >
          <ChevronLeft size={14} /> Back
        </Button>
        {step < OPD_STEPS.length - 1 ? (
          <Button type="button" size="sm" onClick={nextStep} className="gap-1">
            Next <ChevronRight size={14} />
          </Button>
        ) : (
          <Button type="submit" size="sm" className="gap-1 bg-primary hover:bg-primary/90">
            <CheckCircle2 size={14} /> Register Patient
          </Button>
        )}
      </div>
    </form>
  )
}

// ─── IPD Multi-step Form ──────────────────────────────────────────────────────

function IPDForm({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState(0)
  // BUG FIX: Separate state for all Select values in IPD
  const [selectValues, setSelectValues] = useState<Partial<IPDFormInputs>>({
    gender: undefined,
    bloodGroup: undefined,
    department: undefined,
    ward: undefined,
    bedType: undefined,
    attendantRelation: undefined,
    appointmentType: "walk-in",
    priority: "normal",
  })
  const [selectErrors, setSelectErrors] = useState<Partial<Record<keyof IPDFormInputs, string>>>({})
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<IPDFormInputs>()

  const setSelect = (field: keyof IPDFormInputs, value: string) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }))
    setSelectErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // BUG FIX: Validate required Selects per step
  const validateSelectsForStep = (s: number): boolean => {
    const newErrors: Partial<Record<keyof IPDFormInputs, string>> = {}
    if (s === 0 && !selectValues.gender) newErrors.gender = "Required"
    if (s === 1 && !selectValues.department) newErrors.department = "Required"
    if (s === 2) {
      if (!selectValues.ward) newErrors.ward = "Required"
      if (!selectValues.bedType) newErrors.bedType = "Required"
    }
    if (Object.keys(newErrors).length > 0) {
      setSelectErrors(newErrors)
      return false
    }
    return true
  }

  const nextStep = async () => {
    const fields: (keyof IPDFormInputs)[][] = [
      ["firstName", "lastName", "phone", "dob", "emergencyContact"],
      ["chiefComplaint", "admissionReason"],
      ["attendantName"],
      [],
    ]
    const [rhfValid, selectValid] = await Promise.all([
      trigger(fields[step]),
      Promise.resolve(validateSelectsForStep(step)),
    ])
    if (rhfValid && selectValid) setStep((s) => s + 1)
  }

  const onSubmit: SubmitHandler<IPDFormInputs> = async (data) => {
    if (!validateSelectsForStep(step)) return
    const fullData = { ...data, ...selectValues }
    console.log("=== IPD PATIENT FULL DATA ===", fullData)
    try {
      const user = await createPatients({
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        visitType: "IPD",
        department: selectValues.department,
        gender: selectValues.gender,
        bloodGroup: selectValues.bloodGroup,
        dob: data.dob,
        address: data.address,
        emergencyContact: data.emergencyContact,
        chiefComplaint: data.chiefComplaint,
        symptoms: data.symptoms,
        allergies: data.allergies,
        currentMedications: data.currentMedications,
        admissionReason: data.admissionReason,
        estimatedStay: data.estimatedStay ? Number(data.estimatedStay) : undefined,
        ward: selectValues.ward,
        bedType: selectValues.bedType,
        attendantName: data.attendantName,
        attendantRelation: selectValues.attendantRelation,
        doctor: data.doctor,
        insuranceProvider: data.insuranceProvider,
        insurancePolicyNo: data.insurancePolicyNo,
      })
      console.log("=== CREATED PATIENT RESPONSE ===", user)
      toast.success("IPD Patient Admitted", {
        description: `Bed assigned for ${data.firstName} ${data.lastName} in ${selectValues.ward}`,
      })
      onSuccess()
      router.push(`/dashboard/patient/${user.id}`)
    } catch (err) {
      console.error("=== IPD ADMISSION ERROR ===", err)
      toast.error("Admission failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator steps={IPD_STEPS} current={step} />

      {/* Step 0 — Personal */}
      {step === 0 && (
        <div className="space-y-4">
          <SectionTitle icon={User} title="Personal Information" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name" required error={errors.firstName?.message}>
              <Input placeholder="Priya" {...register("firstName", { required: "Required" })} className="h-9 text-sm" />
            </FormField>
            <FormField label="Last Name" required error={errors.lastName?.message}>
              <Input placeholder="Singh" {...register("lastName", { required: "Required" })} className="h-9 text-sm" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date of Birth" required error={errors.dob?.message}>
              <Input type="date" {...register("dob", { required: "Required" })} className="h-9 text-sm" />
            </FormField>
            <FormField label="Gender" required error={selectErrors.gender}>
              <Select onValueChange={(v) => setSelect("gender", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Phone" required error={errors.phone?.message}>
              <Input
                placeholder="+91 98765 43210"
                {...register("phone", {
                  required: "Required",
                  pattern: { value: /^[0-9+\s-]{10,}$/, message: "Invalid number" },
                })}
                className="h-9 text-sm"
              />
            </FormField>
            <FormField label="Blood Group">
              <Select onValueChange={(v) => setSelect("bloodGroup", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((bg) => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <FormField label="Emergency Contact" required error={errors.emergencyContact?.message}>
            <Input
              placeholder="+91 XXXXX XXXXX"
              {...register("emergencyContact", { required: "Required" })}
              className="h-9 text-sm"
            />
          </FormField>
          <FormField label="Address">
            <Textarea placeholder="Full address" {...register("address")} className="text-sm resize-none" rows={2} />
          </FormField>
        </div>
      )}

      {/* Step 1 — Clinical */}
      {step === 1 && (
        <div className="space-y-4">
          <SectionTitle icon={Activity} title="Clinical Details" />
          <FormField label="Reason for Admission" required error={errors.admissionReason?.message}>
            <Textarea
              placeholder="Describe why the patient needs to be admitted..."
              {...register("admissionReason", { required: "Required" })}
              className="text-sm resize-none"
              rows={3}
            />
          </FormField>
          <FormField label="Chief Complaint" required error={errors.chiefComplaint?.message}>
            <Textarea
              placeholder="Primary complaints..."
              {...register("chiefComplaint", { required: "Required" })}
              className="text-sm resize-none"
              rows={2}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Known Allergies">
              <Input placeholder="Penicillin..." {...register("allergies")} className="h-9 text-sm" />
            </FormField>
            <FormField label="Current Medications">
              <Input placeholder="Metformin 500mg..." {...register("currentMedications")} className="h-9 text-sm" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Department" required error={selectErrors.department}>
              <Select onValueChange={(v) => setSelect("department", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Estimated Stay (days)">
              <Input type="number" placeholder="3" {...register("estimatedStay")} className="h-9 text-sm" />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 2 — Admission Details */}
      {step === 2 && (
        <div className="space-y-4">
          <SectionTitle icon={BedDouble} title="Admission & Bed Details" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Ward" required error={selectErrors.ward}>
              <Select onValueChange={(v) => setSelect("ward", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select ward" /></SelectTrigger>
                <SelectContent>
                  {WARDS.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Bed Type" required error={selectErrors.bedType}>
              <Select onValueChange={(v) => setSelect("bedType", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="semi-private">Semi-Private</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="icu">ICU</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Attendant Name" required error={errors.attendantName?.message}>
              <Input
                placeholder="Family member's name"
                {...register("attendantName", { required: "Required" })}
                className="h-9 text-sm"
              />
            </FormField>
            <FormField label="Relation to Patient">
              <Select onValueChange={(v) => setSelect("attendantRelation", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["Spouse", "Parent", "Child", "Sibling", "Friend", "Other"].map((r) => (
                    <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <FormField label="Admitting Doctor">
            <Input placeholder="Dr. Name" {...register("doctor")} className="h-9 text-sm" />
          </FormField>
        </div>
      )}

      {/* Step 3 — Insurance */}
      {step === 3 && (
        <div className="space-y-4">
          <SectionTitle icon={Building2} title="Insurance & Payment" />
          <div className="p-3 bg-accent/50 rounded-lg border border-primary/20 text-xs text-muted-foreground flex items-start gap-2">
            <AlertCircle size={13} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Insurance details are optional. Leave blank if patient is paying out-of-pocket.</span>
          </div>
          <FormField label="Insurance Provider">
            <Input placeholder="Star Health, ICICI Lombard..." {...register("insuranceProvider")} className="h-9 text-sm" />
          </FormField>
          <FormField label="Policy / TPA Number">
            <Input placeholder="Policy number" {...register("insurancePolicyNo")} className="h-9 text-sm" />
          </FormField>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <Button type="button" variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="gap-1">
          <ChevronLeft size={14} /> Back
        </Button>
        {step < IPD_STEPS.length - 1 ? (
          <Button type="button" size="sm" onClick={nextStep} className="gap-1">
            Next <ChevronRight size={14} />
          </Button>
        ) : (
          <Button type="submit" size="sm" className="gap-1 bg-primary hover:bg-primary/90">
            <CheckCircle2 size={14} /> Admit Patient
          </Button>
        )}
      </div>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function Page() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [visitType, setVisitType] = useState<VisitType>("OPD")
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"all" | "OPD" | "IPD">("all")

  const fetchPatients = useCallback(async () => {
    try {
      if (session?.user?.id) {
        const data = await getDetails(session.user.id)
        console.log("=== FETCHED PATIENTS ===", data)
        setPatients(data)
      }
    } catch (e) {
      console.error("Error fetching patients", e)
    }
  }, [session?.user?.id])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  // BUG FIX: Reset dialog state when it closes or visit type switches
  const handleOpenChange = (val: boolean) => {
    setOpen(val)
  }

  // BUG FIX: Switching visit type resets internal form by unmounting/remounting
  const handleVisitTypeChange = (type: VisitType) => {
    setVisitType(type)
  }

  const filtered = patients.filter((p) => {
    const name = p.name || `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    // BUG FIX: Default visitType to "OPD" when missing so filter="OPD" still shows them
    const effectiveType = p.visitType ?? "OPD"
    const matchType = filterType === "all" || effectiveType === filterType
    return matchSearch && matchType
  })

  const todayOPD = patients.filter((p) => (p.visitType ?? "OPD") === "OPD").length
  const todayIPD = patients.filter((p) => p.visitType === "IPD").length

  return (
    // BUG FIX: Full screen — use h-screen flex flex-col and overflow-hidden
    <div className="h-screen flex flex-col bg-background overflow-hidden">

      {/* ── Header bar ── */}
      <div className="flex-none bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-foreground leading-tight">
            Patient Registration
          </h1>
          <p className="text-xs text-muted-foreground">
            Welcome, {session?.user?.name ?? "Doctor"}
          </p>
        </div>

        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-accent px-2.5 py-1.5 rounded-lg">
            <Stethoscope size={12} className="text-primary" />
            <span className="font-medium text-accent-foreground">OPD</span>
            <span className="font-bold text-primary">{todayOPD}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1.5 rounded-lg">
            <BedDouble size={12} className="text-foreground/60" />
            <span className="font-medium text-secondary-foreground">IPD</span>
            <span className="font-bold text-foreground">{todayIPD}</span>
          </div>
        </div>

        {/* Register buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs h-8"
            onClick={() => { handleVisitTypeChange("IPD"); setOpen(true) }}
          >
            <BedDouble size={13} />
            <span className="hidden sm:inline">Admit IPD</span>
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs h-8 bg-primary hover:bg-primary/90"
            onClick={() => { handleVisitTypeChange("OPD"); setOpen(true) }}
          >
            <UserPlus size={13} />
            <span className="hidden sm:inline">Register OPD</span>
          </Button>
        </div>
      </div>

      {/* ── Body (scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5">

        {/* Search & filter row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm bg-card"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 bg-muted rounded-lg p-1">
            {(["all", "OPD", "IPD"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                  filterType === type
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "All Patients" : type}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground ml-auto">
            {filtered.length} patient{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-semibold text-muted-foreground pl-4">Patient</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Phone</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Type</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Department</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <UserPlus size={28} className="text-muted-foreground/40" />
                      <span>No patients found</span>
                      <span className="text-xs">Register your first patient using the button above</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p, i) => {
                  const name = p.name || `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()
                  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                  const effectiveVisitType = p.visitType ?? "OPD"
                  const status = p.status ?? (effectiveVisitType === "IPD" ? "admitted" : "waiting")
                  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.waiting

                  return (
                    <TableRow
                      key={p.id ?? i}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <TableCell className="pl-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground leading-tight">{name}</p>
                            {p.id && <p className="text-[10px] text-muted-foreground">#{p.id.slice(0, 8)}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            effectiveVisitType === "OPD"
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {effectiveVisitType === "OPD" ? <Stethoscope size={10} /> : <BedDouble size={10} />}
                          {effectiveVisitType}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.department ?? "—"}</TableCell>
                      <TableCell>
                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                          style={{ color: statusCfg.color, background: statusCfg.bg }}
                        >
                          {statusCfg.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                          : "Today"}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── Registration Dialog ── */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
          {/* Dialog header with type switcher */}
          <div className="sticky top-0 bg-card z-10 px-5 pt-5 pb-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <DialogTitle className="text-base font-semibold">
                  {visitType === "OPD" ? "OPD Registration" : "IPD Admission"}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {visitType === "OPD"
                    ? "Register patient for outpatient consultation"
                    : "Admit patient for inpatient care"}
                </p>
              </div>
              {/* BUG FIX: Type switcher unmounts current form (resets steps/state) */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1 ml-4">
                <button
                  type="button"
                  onClick={() => handleVisitTypeChange("OPD")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    visitType === "OPD" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <Stethoscope size={11} /> OPD
                </button>
                <button
                  type="button"
                  onClick={() => handleVisitTypeChange("IPD")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    visitType === "IPD" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <BedDouble size={11} /> IPD
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 pt-4">
            {/* BUG FIX: key prop forces full remount on type change, resetting all form state */}
            {visitType === "OPD" ? (
              <OPDForm key="opd" onSuccess={() => { setOpen(false); fetchPatients() }} />
            ) : (
              <IPDForm key="ipd" onSuccess={() => { setOpen(false); fetchPatients() }} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page