import { ArrowUpRight, CreditCard } from "lucide-react"
import { motion } from "framer-motion";
import logo from "@/assets/lapo-logo.png";

export default function DashboardPrev() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="h-full flex flex-col justify-center p-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold mb-2">The simplest way to manage your cards</h2>
        <p className="text-gray-600">Enter your credentials to access your account</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center mb-4">
          <img src={logo} alt="LAPO Logo" width={100} height={30} className="mr-auto" />
          <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">Dashboard</div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Hi Nazeer, what would you like to do today?</h3>
          <p className="text-xs text-gray-500">Last login: 26/10/2024 14:39:58</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Your Quick Access</p>
          <div className="flex space-x-3">
            <QuickAccessCard icon="manage" label="Manage a Card" />
            <QuickAccessCard icon="instant" label="Issue Instant Card" />
            <QuickAccessCard icon="personalized" label="Issue Personalized" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Active Cards"
            value="26,478"
            change="+9%"
            period="this month"
            color="green"
            icon="card"
          />
          <StatCard
            title="Total Personalized Cards"
            value="15,703"
            change="+8.5%"
            period="this month"
            color="blue"
            icon="personalized"
          />
          <StatCard title="Today's Revenue" value="₦9.3M" change="+2%" color="purple" icon="revenue" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Card Status Overview</h3>
            <button className="text-xs text-blue-600 flex items-center">
              View All <ArrowUpRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="h-32 flex items-end space-x-2">
            {[60, 80, 50, 70, 40, 90, 75].map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 flex flex-col items-center"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="w-full bg-blue-100 rounded-sm" style={{ height: `${height}%` }}></div>
                <div className="text-xs text-gray-400 mt-1">{["M", "T", "W", "T", "F", "S", "S"][index]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-right text-xs text-gray-500">
        POWERED BY
        <div className="inline-block ml-2">
          <img src="/cardinfra-logo.png" alt="Cardinfra Logo" width={80} height={20} />
        </div>
      </motion.div>
    </motion.div>
  )
}



function QuickAccessCard({ icon, label }) {
  const getIcon = () => {
    switch (icon) {
      case "manage":
        return (
          <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
            <CreditCard className="h-4 w-4" />
          </div>
        )
      case "instant":
        return (
          <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
            <CreditCard className="h-4 w-4" />
          </div>
        )
      case "personalized":
        return (
          <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
            <CreditCard className="h-4 w-4" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="flex items-center space-x-2 bg-gray-50 rounded-md p-2 text-xs"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {getIcon()}
      <span>{label}</span>
    </motion.div>
  )
}



function StatCard({ title, value, change, period, color, icon }) {
  const getColorClass = () => {
    switch (color) {
      case "green":
        return "text-green-500"
      case "blue":
        return "text-blue-500"
      case "purple":
        return "text-purple-500"
      default:
        return "text-green-500"
    }
  }

  const getIcon = () => {
    switch (icon) {
      case "card":
        return (
          <div className="text-green-500">
            <CreditCard className="h-5 w-5" />
          </div>
        )
      case "personalized":
        return (
          <div className="text-blue-500">
            <CreditCard className="h-5 w-5" />
          </div>
        )
      case "revenue":
        return (
          <div className="text-purple-500">
            <CreditCard className="h-5 w-5" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="bg-gray-50 rounded-md p-3"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs text-gray-500">{title}</div>
        {getIcon()}
      </div>
      <div className="text-xl font-bold mb-1">{value}</div>
      {change && (
        <div className="flex items-center text-xs">
          <span className={getColorClass()}>{change}</span>
          {period && <span className="text-gray-400 ml-1">{period}</span>}
        </div>
      )}
    </motion.div>
  )
}
