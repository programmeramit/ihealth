import { Toaster } from "@/components/ui/sonner"
import Providers from "@/provider/provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-gray-100 text-black">
        <Providers>
          <SidebarProvider>
            <AppSidebar/>
  
        {children}
                <Toaster />
                </SidebarProvider>

                </Providers>

      </body>
    </html>
  );
}