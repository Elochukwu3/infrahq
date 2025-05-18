
import { Bell, ChevronLeft, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useOutletContext } from "react-router-dom"

function useDashboardContext() {
  return useOutletContext();
}

export default function Header({ icon, label, back, iconBack, iconTwo, labelTwo }) {
  const { toggleSidebar } = useDashboardContext();
  return (
    <motion.header
         className="h-16 border-b lg:sticky top-0 bg-white flex items-center justify-between px-0 md:px-4 z-30"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden cursor-pointer">
          <Menu className="h-5 w-5 text-gray-500" />
        </Button>
        {back && (<>
         <div className="relative gap-2 hidden md:flex items-center">
      
      <span className="flex items-center"><ChevronLeft size={21} className="text-[#D0D5DD]"/>Back</span>
      <span className={cn("mr-3 text-[#D0D5DD]")}>
        {iconBack}
      </span>
     </div>
        </>)}
     {iconTwo && (<>
        <div className="relative hidden md:flex items-center">
      
      <span className={cn("mr-3 text-[#D0D5DD]")}>
        {iconTwo}
      </span>
      <span>{labelTwo}</span>
     </div>
     </>)}
      <div className="relative hidden md:flex items-center">
      
      <span className={cn("mr-3 text-[#D0D5DD]")}>
        {icon}
      </span>
      <span>{label}</span>
     </div>
      </div>
      <div className="flex items-center space-x-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-500" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
