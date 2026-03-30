"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  BedDouble,
  Calendar,
  CreditCard,
  FileBarChart2,
  Settings,
  MessageSquare,
  Mail,
  FileText,
  UserCog,
  Ambulance,
  FlaskConical,
  Pill,
  LogOut,
  ChevronRight,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  badge?: number | string
  badgeRed?: boolean
}

interface NavGroup {
  groupLabel: string
  items: NavItem[]
}

// ─── Nav Config ───────────────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    groupLabel: "Main Menu",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Doctors",   icon: Stethoscope,     href: "/doctors"   },
      { label: "Patients",  icon: Users,           href: "/patients", badge: 12 },
      { label: "Staff",     icon: UserCog,         href: "/staff"     },
    ],
  },
  {
    groupLabel: "Other Menu",
    items: [
      { label: "OPD",             icon: Calendar,      href: "/opd",       badge: 4              },
      { label: "IPD",             icon: BedDouble,     href: "/ipd",       badge: 3              },
      { label: "Emergency",       icon: Ambulance,     href: "/emergency", badge: "!", badgeRed: true },
      { label: "Doctor Schedule", icon: Calendar,      href: "/schedule"                         },
      { label: "Payroll",         icon: CreditCard,    href: "/payroll"                          },
      { label: "Chat",            icon: MessageSquare, href: "/chat",      badge: 6              },
      { label: "Email",           icon: Mail,          href: "/email"                            },
    ],
  },
  {
    groupLabel: "Help & Settings",
    items: [
      { label: "Invoice",    icon: FileText,      href: "/invoice"  },
      { label: "Settings",   icon: Settings,      href: "/settings" },
      { label: "Reports",    icon: FileBarChart2, href: "/reports"  },
      { label: "Laboratory", icon: FlaskConical,  href: "/lab"      },
      { label: "Pharmacy",   icon: Pill,          href: "/pharmacy" },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const pathname = usePathname?.() ?? "/dashboard"

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-100 bg-white"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
        "--sidebar-width": "220px",
      } as React.CSSProperties}
    >
      {/* ── HEADER ── */}
      <SidebarHeader
        className={`flex items-center gap-2.5 px-4 py-5 ${
          isCollapsed ? "justify-center px-2" : ""
        }`}
      >
        {/* Pre Clinic style cross/plus logo */}
        <div className="w-8 h-8 flex-shrink-0 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-7 bg-teal-500 rounded-sm" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-2.5 bg-teal-500 rounded-sm" />
          </div>
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-teal-300 rounded-full" />
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-teal-300 rounded-full" />
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-teal-300 rounded-full" />
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-teal-300 rounded-full" />
        </div>

        {!isCollapsed && (
          <p className="font-bold text-gray-800 text-[15px] tracking-tight">
            Pre Clinic
          </p>
        )}
      </SidebarHeader>

      {/* ── CONTENT ── */}
      <SidebarContent className="px-3 pb-4 overflow-y-auto">
        {navGroups.map((group) => (
          <SidebarGroup key={group.groupLabel} className="mb-1 pt-3">
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
                {group.groupLabel}
              </p>
            )}

            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`
                        flex items-center rounded-xl transition-all duration-150 cursor-pointer
                        ${isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"}
                        ${
                          isActive
                            ? "bg-teal-500 text-white shadow-sm shadow-teal-200"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        size={17}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={`flex-shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />

                      {!isCollapsed && (
                        <>
                          <span
                            className={`flex-1 text-[13px] font-medium ${
                              isActive ? "text-white" : "text-gray-600"
                            }`}
                          >
                            {item.label}
                          </span>

                          {item.badge !== undefined && (
                            <span
                              className={`
                                text-[10px] font-bold min-w-[18px] h-[18px] flex items-center
                                justify-center rounded-full px-1 leading-none
                                ${
                                  isActive
                                    ? "bg-white/25 text-white"
                                    : item.badgeRed
                                    ? "bg-red-500 text-white"
                                    : "bg-teal-500 text-white"
                                }
                              `}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── FOOTER ── */}
      <SidebarFooter className="p-3 border-t border-gray-100">
        {/* User row */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-2.5"
          } px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors mb-1`}
        >
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              AD
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-[1.5px] border-white" />
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-700 truncate leading-tight">
                  Dr. Admin
                </p>
                <p className="text-[10px] text-gray-400 truncate leading-tight">
                  Administrator
                </p>
              </div>
              <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
            </>
          )}
        </div>

        {/* Logout */}
        <button
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center py-2" : "gap-2 px-3 py-2"
          } text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all text-[13px] font-medium`}
        >
          <LogOut size={15} strokeWidth={1.8} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}