"use client";
import {
  School,
  Home,
  Album,
  CircleHelp,
  Settings,
  ChartPie,
  Loader2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggler";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: School,
  },
  {
    title: "Chapter",
    url: "#",
    icon: Album,
  },
  {
    title: "Help",
    url: "#",
    icon: CircleHelp,
  },
  {
    title: "Reports",
    url: "#",
    icon: ChartPie,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const onClick = async () => {
    setSubmitting(true);
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.status === 200) {
        localStorage.setItem("token", "");
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  const pathName = usePathname();
  return (
    <Sidebar className="bg-white dark:bg-black">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 mt-2" asChild>
            <Link href="/">
              <img
                src="/icon.svg"
                className=" dark:bg-slate-300 dark:p-0.5 rounded-md"
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`mb-2 font-medium text-xl text-black dark:text-white  ${
                    pathName.includes(item.url)
                      ? "bg-gray-200 dark:bg-gray-700 rounded-md font-bold"
                      : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className=" flex items-center justify-between gap-x-2">
          <ThemeToggle />
          <Button
            disabled={submitting}
            onClick={onClick}
            className="bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-white text-center"
          >
            {submitting ? (
              <Loader2Icon className="aniamte-spin size-4" />
            ) : (
              <div>Logout</div>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
