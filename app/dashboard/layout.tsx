import { Toaster } from "@/components/ui/sonner"
import Providers from "@/provider/provider";
import Navbar from "@/components/myComp/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/myComp/AppSidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-gray-100 text-black">
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