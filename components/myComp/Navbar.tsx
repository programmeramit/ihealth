import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
function Navbar() {
  return (
    <div>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger className="rounded-md p-1.5 hover:bg-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              MediCare Dashboard
            </span>
          </header>
          </div>
  )
}

export default Navbar