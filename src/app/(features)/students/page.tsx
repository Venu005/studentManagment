/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AddStudent } from "@/components/AddStudent";
import StudentsTable from "@/components/StudentsTable";

import { toast } from "@/hooks/use-toast";
import useUserStore from "@/store/useStore";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
interface Student {
  id: string; // or number, depending on your data structure
  name: string;
  cohort: {
    academicYear: string;
  };
  class: {
    name: string;
  };
}
const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    let isMounted = true;
    async function getStudents() {
      try {
        const res = await axios.get("/api/filtering/getStudents", {
          params: {
            teacherId: user?.id,
          },
        });
        if (isMounted) {
          setStudents(res.data.data);
        }
      } catch (error: any) {
        if (isMounted) {
          toast({
            variant: "destructive",
            title: "Failure",
            description: "Failed to fetch students, try again later",
          });
          console.error("error in fetching student", error);
          setisLoading(false);
        }
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    }
    if (user?.id) {
      getStudents();
    } else {
      setisLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [user]);
  const addStudent = (newStudent: any) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin size-5" />
      </div>
    );
  }
  // Filter students based on selected class and cohort
  const filteredStudents = students.filter((student) => {
    const matchesClass = selectedClass
      ? student.class.name === selectedClass
      : true;
    const matchesCohort = selectedCohort
      ? student.cohort.academicYear === selectedCohort
      : true;
    return matchesClass && matchesCohort;
  });

  return (
    <div className="p-2 rounded-lg bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-4 mt-4 p-2">
        <div className="flex space-x-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-1 rounded font-medium dark:text-white dark:bg-slate-800 text-slate-500 bg-slate-200 border-slate-300 cursor-pointer text-sm"
          >
            <option value="">Select Class</option>
            <option value="CBSE9">CBSE 9</option>
            <option value="CBSE10">CBSE 10</option>
          </select>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="border  p-1 rounded font-medium dark:text-white dark:bg-slate-800 text-slate-500 bg-slate-200 border-slate-300 cursor-pointer text-sm"
          >
            <option value="">Select Cohort</option>
            <option value="AY 2024-25" className="">
              AY 2024-25
            </option>
            <option value="AY 2025-26">AY 2025-26</option>
          </select>
        </div>
        <AddStudent onAddStudent={addStudent} />
      </div>
      <StudentsTable filteredStudents={filteredStudents} />
    </div>
  );
};

export default Students;
