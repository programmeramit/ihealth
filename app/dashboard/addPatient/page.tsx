"use client";

import React, { useState } from "react";
import {
  User2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Droplets,
  FileText,
  Stethoscope,
  ChevronRight,
  Save,
  X,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

// ── FieldGroup: labelled input wrapper ───────────────────────────────────────

function FieldGroup({ label, icon: Icon, required, children, className = "" }) {
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

// ── InputWithIcon: input with left-side icon ─────────────────────────────────

function InputWithIcon({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      )}
      <Input className={Icon ? "pl-9" : ""} {...props} />
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, subtitle }) {
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

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AddPatientPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    diagnosis: "",
    allergies: "",
    notes: "",
    assignedDoctor: "",
    type:''
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target?.value ?? e }));

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
            <SectionHeader
              icon={User2}
              title="Personal Details"
              subtitle="Basic identifying information"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FieldGroup label="First Name" icon={User2} required>
                <InputWithIcon
                  icon={User2}
                  placeholder="e.g. Rahul"
                  value={form.firstName}
                  onChange={set("firstName")}
                />
              </FieldGroup>

              <FieldGroup label="Last Name" required>
                <Input
                  placeholder="e.g. Sharma"
                  value={form.lastName}
                  onChange={set("lastName")}
                />
              </FieldGroup>

              <FieldGroup label="Date of Birth" icon={Calendar} required>
                <InputWithIcon
                  icon={Calendar}
                  type="date"
                  value={form.dob}
                  onChange={set("dob")}
                />
              </FieldGroup>

              <FieldGroup label="Gender" required>
                <Select onValueChange={set("gender")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
              <FieldGroup label="Type" required>
                <Select onValueChange={set("type")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IPD">IPD</SelectItem>
                    <SelectItem value="OPD">OPD</SelectItem>
                   
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Blood Group" icon={Droplets}>
                <Select onValueChange={set("bloodGroup")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(
                      (g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Assigned Doctor" icon={Stethoscope}>
                <Select onValueChange={set("assignedDoctor")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. Smith — Cardiology</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel — General</SelectItem>
                    <SelectItem value="dr-mehta">Dr. Mehta — Neurology</SelectItem>
                    <SelectItem value="dr-jones">Dr. Jones — Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </div>
          </div>

          <Separator />

          {/* ══ Section 2: Contact Info ══ */}
          <div>
            <SectionHeader
              icon={Phone}
              title="Contact Information"
              subtitle="Phone, email and address details"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Phone Number" icon={Phone} required>
                <InputWithIcon
                  icon={Phone}
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </FieldGroup>

              <FieldGroup label="Email Address" icon={Mail}>
                <InputWithIcon
                  icon={Mail}
                  type="email"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </FieldGroup>

              <FieldGroup label="Street Address" icon={MapPin} className="sm:col-span-2">
                <InputWithIcon
                  icon={MapPin}
                  placeholder="House / Flat no., Street, Locality"
                  value={form.address}
                  onChange={set("address")}
                />
              </FieldGroup>

              <FieldGroup label="City" required>
                <Input
                  placeholder="e.g. Bokaro"
                  value={form.city}
                  onChange={set("city")}
                />
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup label="State" required>
                  <Input
                    placeholder="e.g. Jharkhand"
                    value={form.state}
                    onChange={set("state")}
                  />
                </FieldGroup>
                <FieldGroup label="PIN Code">
                  <Input
                    placeholder="827001"
                    maxLength={6}
                    value={form.pincode}
                    onChange={set("pincode")}
                  />
                </FieldGroup>
              </div>
            </div>
          </div>

          <Separator />

          {/* ══ Section 3: Medical Info ══ */}
          <div>
            <SectionHeader
              icon={FileText}
              title="Medical Details"
              subtitle="Diagnosis, allergies and clinical notes"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Primary Diagnosis" icon={Stethoscope}>
                <InputWithIcon
                  icon={Stethoscope}
                  placeholder="e.g. Hypertension"
                  value={form.diagnosis}
                  onChange={set("diagnosis")}
                />
              </FieldGroup>

              <FieldGroup label="Known Allergies">
                <Input
                  placeholder="e.g. Penicillin, Sulfa drugs"
                  value={form.allergies}
                  onChange={set("allergies")}
                />
              </FieldGroup>

              <FieldGroup label="Clinical Notes" className="sm:col-span-2">
                <Textarea
                  placeholder="Additional clinical observations, history, or remarks..."
                  rows={4}
                  value={form.notes}
                  onChange={set("notes")}
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
            <Button className="w-full sm:w-auto gap-2">
              <Save className="h-4 w-4" />
              Register Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}