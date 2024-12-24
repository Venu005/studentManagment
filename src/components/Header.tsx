/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { CircleHelp } from "lucide-react";
import { MessageSquareDot } from "lucide-react";
import { BellDot } from "lucide-react";
import { Settings2 } from "lucide-react";
import useUserStore from "@/store/useStore";
import axios from "axios";

const Header = () => {
  const user = useUserStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      if (user?.id && searchTerm) {
        try {
          const res = await axios.get("/api/filtering/getCourses", {
            params: { teacherId: user.id },
          });
          setCourses(res.data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };
    fetchCourses();
  }, [user, searchTerm]);
  useEffect(() => {
    if (searchTerm) {
      const results = courses.filter((course: any) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(results);
    } else {
      setFilteredCourses([]);
    }
  }, [searchTerm, courses]);
  return (
    <header
      className={`w-full px-4 py-3 flex items-center justify-between bg-background text-foreground bg-slate-50 dark:bg-black`}
    >
      <div className="flex items-center w-[1200px]">
        <Input
          type="search"
          placeholder="Search your course"
          className="max-w-sm bg-white border-white border-12 dark:bg-black dark:border-gray-200 border-2 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && filteredCourses.length > 0 && (
          <div className="absolute bg-white dark:bg-dark border rounded-md shadow-lg mt-20 ">
            {filteredCourses.map((course: any) => (
              <div
                key={course.id}
                className="p-2 hover:bg-gray-200 cursor-pointer dark:text-white dark:bg-black "
              >
                {course.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="items-center space-x-8 hidden sm:flex">
        <CircleHelp className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" />
        <MessageSquareDot className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" />
        <BellDot className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" />
        <Settings2 className="w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" />
        <Avatar>
          <AvatarImage
            className="cursor-pointer"
            src="https://i.pinimg.com/originals/19/46/9a/19469aed7f222d6009f48158a682bb9c.png"
          />
          <AvatarFallback>Teacher</AvatarFallback>
        </Avatar>
        <span className="font-medium mr-4">{user?.name}</span>
      </div>
    </header>
  );
};
export default Header;
