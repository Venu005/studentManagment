/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

const StudentsTable = ({ filteredStudents }: any) => {
  const getRandomStatusColor = () => {
    return Math.random() > 0.5 ? "bg-green-500" : "bg-red-500";
  };
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);
  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = filteredStudents.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>List of students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black dark:text-white">
              Student Name
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Cohort
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Courses
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Date joined
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Last login
            </TableHead>
            <TableHead className="font-bold text-black dark:text-white">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEntries.map((student: any) => (
            <TableRow
              key={student.id}
              className="text-slate-800 dark:text-white font-semibold text-sm"
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.cohort.academicYear}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-x-2">
                  {student.courses.map((course: any) => (
                    <p
                      key={course.name}
                      className="rounded-lg bg-slate-200 dark:bg-gray-600 p-0.5 text-center text-xs"
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
      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="dark:bg-gray-700 dark:text-white"
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="dark:bg-gray-700 dark:text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudentsTable;
