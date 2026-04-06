"use client"
import { useState } from "react";

import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Users,
  UserPlus,
  Eye,
  LogOut,
  ChevronDown,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { title } from "process";

// ─── Nav Data ────────────────────────────────────────────────────────────────

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "",
    key: "dashboard",
  },
  {
    title: "Profile",
    icon: User,
    href: "profile",
    key: "profile",
  },
  {
    title: "Patients",
    icon: Users,
    key: "patients",
    children: [
      {
        title: "Add Patient",
        icon: UserPlus,
        href: "addPatient",
        key: "add-patient",
      },
      {
        title: "View Patients",
        icon: Eye,
        href: "#view-patients",
        key: "view-patients",
      },
    ],
  },
  {
    title: 'Doctor',
    icon: Stethoscope,
    href: 'doctor',
    key: 'doctors',
    children: [
      {
        title: 'Add Doctor',
        icon: UserPlus,
        href: 'addDoctor',
        key: 'add-doctor'
      }
    ]
  },

];

// ─── Inner Sidebar ────────────────────────────────────────────────────────────

export function AppSidebar() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const handleNav = (key: string) => setActiveKey(key);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      {/* ── Header ── */}
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              MediCare
            </span>
            <span className="text-[11px] text-muted-foreground">
              Health Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <Separator className="mb-2 opacity-50" />

      {/* ── Navigation ── */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                if (item.children) {
                  const isOpen = !!openKeys[item.key];
                  const childActive = item.children.some(
                    (child) => activeKey === child.key
                  );

                  return (
                    <Collapsible
                      key={item.key}
                      open={isOpen}
                      onOpenChange={() => toggleOpen(item.key)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              childActive &&
                                "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <item.icon className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" />
                              {item.title}
                            </span>
                            {isOpen ? (
                              <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-5 mt-1 gap-0.5 border-l border-sidebar-border pl-3">
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.key}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={activeKey === child.key}
                                  onClick={() => handleNav(child.key)}
                                  className={cn(
                                    "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    activeKey === child.key &&
                                      "bg-primary/10 font-medium text-primary"
                                  )}
                                >
                                  <Link href={child.href}>
                                    <child.icon className="h-3.5 w-3.5 shrink-0" />
                                    {child.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeKey === item.key}
                      onClick={() => handleNav(item.key)}
                      className={cn(
                        "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        activeKey === item.key &&
                          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                    >
                      <a href={item.href}>
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100",
                            activeKey === item.key && "opacity-100"
                          )}
                        />
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="px-3 py-4">
        <Separator className="mb-4 opacity-50" />

        {/* User card */}
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
          <Avatar className="h-8 w-8 border border-sidebar-border">
            <AvatarImage src="https://github.com/shadcn.png" alt="Dr. Smith" />
            <AvatarFallback className="bg-primary text-[11px] text-primary-foreground">
              DS
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-semibold text-sidebar-foreground">
              Dr. Smith
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Admin · Cardiologist
            </p>
          </div>
        </div>

        {/* Logout */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => console.log("Logging out…")}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Sign out of your account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </Sidebar>
  );
}