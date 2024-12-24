"use client";

import useUserStore from "@/store/useStore";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Dasboard = () => {
  const [classes, setClasses] = useState<{ name: string }[]>([]);
  const [isLoading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    let isMounted = true;

    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/filtering/getClasses", {
          params: {
            teacherId: user?.id,
          },
        });
        if (isMounted) {
          setClasses(res.data.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching classes:", error);
          setLoading(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user?.id) {
      fetchClasses();
    } else {
      setLoading(false); // Set loading to false if no user
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
  return (
    <div className="mt-5 p-5">
      <h1 className="text-3xl font-serif">Hello {user?.name}!!</h1>

      <div className="mt-5">
        <h2 className="text-lg font-semibold">Your Classes:</h2>
        <ul className="flex gap-x-5 mt-2 ">
          {classes.map((item, indx) => (
            <li
              key={indx}
              className="rounded-lg border-2 p-3 cursor-pointer text-pretty hover:border-black transition duration-300 hover:backdrop-blur-sm"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dasboard;
