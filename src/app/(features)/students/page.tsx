"use client";
import { toast } from "@/hooks/use-toast";
import useUserStore from "@/store/useStore";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);
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
          console.error("error in fetching student");
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
    <div>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Class</option>
          <option value="CBSE9">CBSE 9</option>
          <option value="CBSE10">CBSE 10</option>
        </select>
        <select
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Cohort</option>
          <option value="AY 2024-25">AY 2024-25</option>
          <option value="2025-26">2025-26</option>
        </select>
      </div>
      <ul>
        {filteredStudents.map((student, indx) => (
          <li key={indx}>
            {student.name} - {student.class.name} -{" "}
            {student.cohort.academicYear}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
