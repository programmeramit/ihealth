"use client";

import React, { useState } from "react";
import {
  User2,
  Phone,
  Calendar,
  Stethoscope,
  GraduationCap,
  BadgeCheck,
  Building2,
  IndianRupee,
  Clock,
  CalendarDays,
  FileText,
  ImagePlus,
  ChevronRight,
  Save,
  X,
  Power,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { InputHTMLAttributes } from "react";




// ── FieldGroup ────────────────────────────────────────────────────────────────

type FieldGroupProps = {
  label: string
  icon?: LucideIcon
  required?: boolean
  children: ReactNode
  className?: string
}


function FieldGroup({ label, icon: Icon, required, children, className = "" }:FieldGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

// ── InputWithIcon ─────────────────────────────────────────────────────────────

type InputwithIcon = {
  icon: React.ElementType;
} & InputHTMLAttributes<HTMLInputElement>;
function InputWithIcon({ icon: Icon, ...props }:InputwithIcon) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input className={Icon ? "pl-9" : ""} {...props} />
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────

type SectionHeader = {
  icon:LucideIcon,
  title?:string,
  subtitle?:string
}

function SectionHeader({ icon: Icon, title, subtitle }:SectionHeader) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ── WorkingDaysPicker ─────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type WorkingDays = {
  value?:string,
  onChange:any
}



function WorkingDaysPicker({ value, onChange }:WorkingDays) {
  const selected = value ? value.split(",").filter(Boolean) : [];

  const toggle = (day:string) => {
    const next = selected.includes(day)
      ? selected.filter((d) => d !== day)
      : [...selected, day];
    onChange(next.join(","));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((day) => {
        const active = selected.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

// ── ActiveToggle (native — no shadcn Switch needed) ───────────────────────────

type Activetoggle = {
  checked:Boolean,
  onChange:any
}

function ActiveToggle({ checked, onChange }:Activetoggle) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
      <div className="flex items-center gap-3">
        <Power className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">Account Active</p>
          <p className="text-xs text-muted-foreground">
            Inactive doctors won't appear in appointment booking
          </p>
        </div>
      </div>
      {/* Native toggle — no shadcn Switch import needed */}
      <button
        type="button"
        role="switch"
        aria-checked={!!checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          checked ? "bg-primary" : "bg-input"
        }`}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    dob: "",
    specialization: "",
    qualification: "",
    experience: "",
    licenseNumber: "",
    hospitalName: "",
    consultationFee: "",
    availableFrom: "09:00",
    availableTo: "17:00",
    workingDays: "Mon,Tue,Wed,Thu,Fri",
    bio: "",
    profileImage: "",
    isActive: true,
  });

  const set = (key:any) => (e:any) =>
    setForm((prev) => ({ ...prev, [key]: e.target?.value ?? e }));

  const setVal = (key:any) => (val:any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Doctor form payload:", {
      ...form,
      experience: Number(form.experience),
      consultationFee: Number(form.consultationFee),
      dob: new Date(form.dob),
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8 w-full">

      {/* ── Page header ── */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>Doctors</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">Add Doctor</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            New Doctor Registration
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the doctor&apos;s profile. Fields marked{" "}
            <span className="font-medium text-destructive">*</span> are required.
          </p>
        </div>
        <Badge variant="outline" className="hidden gap-1.5 text-xs md:flex">
          <Stethoscope className="h-3 w-3" />
          MediCare HMS
        </Badge>
      </div>

      {/* ── Form card ── */}
      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              Doctor Information
            </CardTitle>
            <CardDescription className="text-xs">
              Complete all sections to onboard a new doctor into the system.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">

            {/* ══ Section 1: Basic Info ══ */}
            <div>
              <SectionHeader
                icon={User2}
                title="Basic Information"
                subtitle="Personal & contact details"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FieldGroup label="Phone Number" icon={Phone} required>
                  <InputWithIcon
                    icon={Phone}
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </FieldGroup>

                <FieldGroup label="Gender" required>
                  <Select onValueChange={setVal("gender")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup label="Date of Birth" icon={Calendar} required>
                  <InputWithIcon
                    icon={Calendar}
                    type="date"
                    value={form.dob}
                    onChange={set("dob")}
                  />
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ══ Section 2: Professional Info ══ */}
            <div>
              <SectionHeader
                icon={GraduationCap}
                title="Professional Details"
                subtitle="Specialization, qualification and credentials"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FieldGroup label="Specialization" icon={Stethoscope} required>
                  <Select onValueChange={setVal("specialization")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Cardiology",
                        "Neurology",
                        "Orthopedics",
                        "Dermatology",
                        "Pediatrics",
                        "Gynecology",
                        "Oncology",
                        "Psychiatry",
                        "Radiology",
                        "General Medicine",
                      ].map((s) => (
                        <SelectItem key={s} value={s.toLowerCase()}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup label="Qualification" icon={GraduationCap} required>
                  <InputWithIcon
                    icon={GraduationCap}
                    placeholder="e.g. MBBS, MD, MS"
                    value={form.qualification}
                    onChange={set("qualification")}
                  />
                </FieldGroup>

                <FieldGroup label="Years of Experience" required>
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    placeholder="e.g. 8"
                    value={form.experience}
                    onChange={set("experience")}
                  />
                </FieldGroup>

                <FieldGroup
                  label="License Number"
                  icon={BadgeCheck}
                  required
                  className="sm:col-span-2 lg:col-span-1"
                >
                  <InputWithIcon
                    icon={BadgeCheck}
                    placeholder="e.g. MCI-2024-XXXXX"
                    value={form.licenseNumber}
                    onChange={set("licenseNumber")}
                  />
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ══ Section 3: Work Info ══ */}
            <div>
              <SectionHeader
                icon={Building2}
                title="Work Information"
                subtitle="Hospital affiliation and consultation fee"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label="Hospital / Clinic Name" icon={Building2}>
                  <InputWithIcon
                    icon={Building2}
                    placeholder="e.g. Apollo Hospital, Bokaro"
                    value={form.hospitalName}
                    onChange={set("hospitalName")}
                  />
                </FieldGroup>

                <FieldGroup label="Consultation Fee (₹)" icon={IndianRupee} required>
                  <InputWithIcon
                    icon={IndianRupee}
                    type="number"
                    min="0"
                    step="50"
                    placeholder="e.g. 500"
                    value={form.consultationFee}
                    onChange={set("consultationFee")}
                  />
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ══ Section 4: Availability ══ */}
            <div>
              <SectionHeader
                icon={Clock}
                title="Availability"
                subtitle="Consultation hours and working days"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FieldGroup label="Available From" icon={Clock} required>
                  <InputWithIcon
                    icon={Clock}
                    type="time"
                    value={form.availableFrom}
                    onChange={set("availableFrom")}
                  />
                </FieldGroup>

                <FieldGroup label="Available To" icon={Clock} required>
                  <InputWithIcon
                    icon={Clock}
                    type="time"
                    value={form.availableTo}
                    onChange={set("availableTo")}
                  />
                </FieldGroup>
              </div>

              <div className="mt-4">
                <FieldGroup label="Working Days" icon={CalendarDays} required>
                  <WorkingDaysPicker
                    value={form.workingDays}
                    onChange={setVal("workingDays")}
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Selected:{" "}
                    <span className="font-medium text-foreground">
                      {form.workingDays || "None"}
                    </span>
                  </p>
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ══ Section 5: Extra ══ */}
            <div>
              <SectionHeader
                icon={FileText}
                title="Additional Details"
                subtitle="Bio, profile image and account status"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup
                  label="Profile Image URL"
                  icon={ImagePlus}
                  className="sm:col-span-2"
                >
                  <InputWithIcon
                    icon={ImagePlus}
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={form.profileImage}
                    onChange={set("profileImage")}
                  />
                </FieldGroup>

                <FieldGroup label="Bio / About" className="sm:col-span-2">
                  <Textarea
                    placeholder="Brief professional summary — qualifications, expertise, achievements..."
                    rows={4}
                    value={form.bio}
                    onChange={set("bio")}
                    className="resize-none"
                  />
                </FieldGroup>

                <div className="sm:col-span-2">
                  <ActiveToggle
                    checked={form.isActive}
                    onChange={setVal("isActive")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ══ Actions ══ */}
            <div className="flex flex-col-reverse items-center justify-end gap-3 pt-1 sm:flex-row">
              <Button
                type="button"
                variant="ghost"
                className="w-full gap-2 text-muted-foreground sm:w-auto"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Save as Draft
              </Button>
              <Button type="submit" className="w-full gap-2 sm:w-auto">
                <Save className="h-4 w-4" />
                Register Doctor
              </Button>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  );
}