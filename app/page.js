"use client"
import React, { useRef } from "react";
import Taskbar from "../components/Home/Taskbar";
import Sidebar from "../components/Home/Sidebarmob";
import { useSession } from "next-auth/react";

export default function Home() {
  const contentRef = useRef(null);
  const session = useSession();
  console.log(session)

  const scrollToBottom = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div  >
      <Taskbar />
      
     
     
    </div>
  );
}
