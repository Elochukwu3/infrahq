import LoginForm  from "@/mycomponents/LoginForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import  DashboardPrev  from "@/mycomponents/DashboardPrev";
import logo from "@/assets/lapo-logo.png";

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen bg-noise">
      <motion.div
        className="w-full lg:w-1/2 flex flex-col p-6 md:p-10 justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img src={logo} alt="LAPO Logo"  />
        </motion.div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <LoginForm />
        </div>

        <motion.div
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          © 2024 Mercator Technologies Ltd. All rights reserved.
        </motion.div>
      </motion.div>

      {!isMobile && (
        <motion.div
          className="hidden lg:block lg:w-1/2 bg-blue-50 relative overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-40 h-40 bg-blue-700 rounded-bl-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          />
          <DashboardPrev/>
        </motion.div>
      )}
    </div>
  );
}