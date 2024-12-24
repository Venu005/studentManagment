/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Loader2Icon, PlusIcon } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function AddStudent({ onAddStudent }: { onAddStudent: any }) {
  const [name, setName] = useState("");
  const [cohortId, setCohortId] = useState("");
  const [classId, setClassId] = useState("");
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cohortOptions = [
    { value: "cohort1", label: "AY 2024-25" },
    { value: "cohort2", label: "AY 2025-26" },
  ];

  const classOptions = [
    { value: "class1", label: "CBSE 9" },
    { value: "class2", label: "CBSE 10" },
  ];

  const courseOptions = [
    { value: "course1", label: "CBSE SCIENCE " },
    { value: "course2", label: "CBSE MATH " },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = {
      name,
      cohortId,
      classId,
      courseIds,
    };

    try {
      const res = await axios.post("/api/createStudents", formData);
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Student added successfully",
        });
        onAddStudent(res.data.data);
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "Failed to add a student",
      });
      console.log(error);
    } finally {
      setSubmitting(false);
    }

    setName("");
    setCohortId("");
    setClassId("");
    setCourseIds([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-200 dark:text-white dark:bg-gray-600 text-slate-500 font-medium rounded-md hover:bg-slate-300 flex gap-x-2">
          Add a student
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add a student
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cohort</label>
            <select
              value={cohortId}
              onChange={(e) => setCohortId(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Cohort</option>
              {cohortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Courses</label>
            <Select
              isMulti
              value={courseOptions.filter((option) =>
                courseIds.includes(option.value)
              )}
              onChange={(selected) => {
                setCourseIds(
                  selected ? selected.map((option) => option.value) : []
                );
              }}
              options={courseOptions}
              className={`basic-multi-select ${
                isOpen
                  ? "dark:bg-gray-700 dark:text-white"
                  : "bg-white text-black"
              }`}
              classNamePrefix="select"
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <div className="flex gap-x-2">
                Submit
                <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
