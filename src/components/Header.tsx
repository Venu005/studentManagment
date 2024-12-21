import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { CircleHelp } from "lucide-react";
import { MessageSquareDot } from "lucide-react";
import { BellDot } from "lucide-react";
import { Settings2 } from "lucide-react";

const Header = () => {
  return (
    <header
      className={`w-full px-4 py-3 flex items-center justify-between bg-background text-foreground`}
    >
      <div className="flex items-center w-[1200px]">
        <Input type="search" placeholder="Search your course" className="max-w-sm" />
      </div>
      <div className="flex items-center space-x-8">
        <CircleHelp className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <MessageSquareDot className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <BellDot className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />
        <Settings2 className="w-6 h-6 cursor-pointer rounded-full  hover:bg-slate-200" />

        <Avatar>
          <AvatarImage src="https://github.com/Venu005" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-medium">VS</span>
      </div>
    </header>
  );
};

export default Header;
