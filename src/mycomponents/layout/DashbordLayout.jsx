import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sdebar";

export default function DashboardLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: isMobile ? -240 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${isMobile ? "fixed z-40" : ""}`}
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="w-full">
        <main className="flex flex-col flex-1 h-screen overflow-hidden">
          <Outlet context={{ toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen) }}  />
        </main>
      </div>
    </div>
  );
}
