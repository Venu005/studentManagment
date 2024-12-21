import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import Header from "@/components/Header";

const DashboardLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayOut;
