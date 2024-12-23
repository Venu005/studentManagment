"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentsTable = ({ filteredStudents }) => {
  const getRandomStatusColor = () => {
    return Math.random() > 0.5 ? "bg-green-500" : "bg-red-500";
  };
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>List of students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Student Name</TableHead>
            <TableHead className="font-bold text-black">Cohort</TableHead>
            <TableHead className="font-bold text-black">Courses</TableHead>
            <TableHead className="font-bold text-black">Date joined</TableHead>
            <TableHead className="font-bold text-black">Last login</TableHead>
            <TableHead className="font-bold text-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow
              key={student.id}
              className="text-slate-800 font-semibold text-sm"
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.cohort.academicYear}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-x-2">
                  {student.courses.map((course) => (
                    <p
                      key={course.name}
                      className="rounded-lg bg-slate-200 p-0.5 text-center text-xs"
                    >
                      {course.name}
                    </p>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(student.createdAt))}
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(student.lastLogin))}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block w-3 h-3 rounded-full ${getRandomStatusColor()}`}
                ></span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
