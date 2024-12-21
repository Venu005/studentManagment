"use client";
import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { CircleHelp } from "lucide-react";
import { MessageSquareDot } from "lucide-react";
import { BellDot } from "lucide-react";
import { Settings2 } from "lucide-react";
import useUserStore from "@/store/useStore";

const Header = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <header
      className={`w-full px-4 py-3 flex items-center justify-between bg-background text-foreground`}
    >
      <div className="flex items-center w-[1200px]">
        <Input
          type="search"
          placeholder="Search your course"
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center space-x-8">
        <CircleHelp className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <MessageSquareDot className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <BellDot className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <Settings2 className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />

        <Avatar>
          <AvatarImage src="https://i.pinimg.com/originals/19/46/9a/19469aed7f222d6009f48158a682bb9c.png" />
          <AvatarFallback>Teacher</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user?.name}</span>
      </div>
    </header>
  );
};

export default Header;
