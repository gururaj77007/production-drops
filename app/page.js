"use client"
import React, { useRef,useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";
import Sidebar from "../components/Home/Sidebarmob";
import { useSession } from "next-auth/react";
import { app,auth } from "./firebase/firebaseapp";
import { getToken } from "firebase/messaging";
import { getMessaging,onMessage } from "firebase/messaging";

export default function Home() {
  const contentRef = useRef(null);
  const session = useSession();
  // const messaging=getMessaging(app)
  
  // async function requestPermission() {
  //   //requesting permission using Notification API
  //   const permission = await Notification.requestPermission();

  //   if (permission === "granted") {
  //     const token = await getToken(messaging, {
  //       vapidKey: "BK_nYkNSOhLl-l0rWQ4KuaXzUKZxnTm9fy4EylOa8tAAoTXhK-MHxggTdl6e8Ew5s1RvTfRFFMDnooNO9D20txs",
  //     });

  //     //We can send token to server
  //     console.log("Token generated : ");
  //   } else if (permission === "denied") {
  //     //notifications are blocked
  //     alert("You denied for the notification");
  //   }
  // }

  useEffect(() => {
   // requestPermission();
   
   const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const get = async (messaging) => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: 'BK_nYkNSOhLl-l0rWQ4KuaXzUKZxnTm9fy4EylOa8tAAoTXhK-MHxggTdl6e8Ew5s1RvTfRFFMDnooNO9D20txs',
      });
      if (currentToken) {
        console.log('FCM token:', currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const messaging = getMessaging(app);

  if (messaging) {
    requestPermission().then(() => get(messaging));
  }

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('Foreground push notification received:', payload);
    alert(payload.notification.body);
  });

  return () => {
    unsubscribe(); // Unsubscribe from the onMessage event
  };
   
  }, []);

  const scrollToBottom = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div  >
      <Taskbar />
      
     
     
    </div>
  );
}
