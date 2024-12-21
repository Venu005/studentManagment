"use client";

import useUserStore from "@/store/useStore";
import React from "react";

const Dasboard = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <h1>hello {user?.name}</h1>
    </div>
  );
};

export default Dasboard;
