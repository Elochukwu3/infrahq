import { useState } from "react"
import { ArrowsUpFromLine, ArrowUp, Calendar, CreditCard, ExternalLink, ExternalLinkIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import Header from "@/mycomponents/Header"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import { navItems } from "@/mycomponents/Sdebar";
import arrUp from "@/assets/arr-up.png"

export function DashboardContent() {
  const [currentDate] = useState(new Date())
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(currentDate)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="h-full">
<Header
icon={navItems[0].icon}
label={navItems[0].label}
        />
        <ContentWrapper>
      <motion.div className="p-6 w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="flex justify-between items-center mb-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold">Hi Nazeer, what would you like to do today?</h1>
          <p className="text-sm text-gray-500">Last login: 26/11/2024 14:39:58</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today
            <span className="ml-2 text-gray-500">11 Nov 2024</span>
          </Button>
        </motion.div>
      </div>
    
      <motion.div variants={itemVariants} className="border px-3 border-[#E2E2E2] rounded-xl bg-white">
        <h2 className="text-lg font-medium mb-3 font-satoshi py-2">Your Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickAccessCard icon={<CreditCard className="h-5 w-5" />} title="Manage a Card" href="/manage-card" />
          <QuickAccessCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Issue Instant Card"
            href="/issue-instant-card"
          />
          <QuickAccessCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Issue Personalized Card"
            href="/issue-personalized-card"
          />
          <QuickAccessCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Review Card Requests"
            href="/review-requests"
          />
        </div>
      </motion.div>

     <motion.h2 
  variants={itemVariants} 
  className="flex items-center my-5 gap-3 text-lg font-medium mb-3 w-full"
>
  <span>Analytics</span>
  <span className="flex-1">
    <hr className="border-t border-gray-200 dark:border-gray-700 w-full" />
  </span>
</motion.h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" variants={itemVariants}>
        <StatCard
          icon="card"
          title="Total Active Cards"
          value="26,478"
          change="+9%"
          period="this month"
          color="green"
        />
        <StatCard
          icon="personalized"
          title="Total Personalized Cards"
          value="15,703"
          change="8.5%"
          period="this month"
          color="purple"
        />
        <StatCard
          icon="revenue"
          title="Today's Revenue"
          value="₦9.3M"
          change="+6%"
          period="vs yesterday"
          color="blue"
        />
        <StatCard icon="pending" title="Pending Requests" value="38" alert="Requires attention" color="orange" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full mb-6">
      <motion.div variants={itemVariants}>
  <Card className="shadow-sm border border-[#E2E2E2] h-full flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-md font-medium">Monthly Issuance</CardTitle>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent className="flex-1 p-4">
      <div className="lg:h-full h-[200px]">
        <MonthlyIssuanceChart />
      </div>
    </CardContent>
  </Card>
</motion.div>

       <motion.div variants={itemVariants}>
  <Card className={"shadow-sm border w-full  border-[#E2E2E2]"}>
    <CardHeader className="flex items-center justify-between pb-2">
      <CardTitle className="text-md font-medium">Recent Card Requests</CardTitle>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Open in new tab">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="text-[#0000008F] font-medium">
            <TableHead>Branch</TableHead>
            <TableHead>Card Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody >
          {[
            {
              branch: "Corporate",
              type: "Instant",
              qty: 10,
              status: "Ready",
              badgeClass: "bg-green-50 text-green-700 border-green-200",
            },
            {
              branch: "Corporate",
              type: "Personalized",
              qty: 10,
              status: "In Progress",
              badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
            },
            {
              branch: "Corporate",
              type: "Personalized",
              qty: 10,
              status: "Acknowledged",
              badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
            },
            {
              branch: "Corporate",
              type: "Instant",
              qty: 10,
              status: "Pending",
              badgeClass: "bg-yellow-50 text-yellow-700 border-yellow-200",
            },
          ].map(({ branch, type, qty, status, badgeClass }, index) => (
            <TableRow key={index} className={"font-satoshi text-[#475467]/60 font-normal"}>
              <TableCell>{branch}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{qty}</TableCell>
              <TableCell>
                <Badge variant="outline" className={badgeClass}>
                  {status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="link" size="sm" className="h-8 text-blue-600">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div variants={itemVariants}>
  <Card className={'shadow-sm w-full border border-[#E2E2E2] h-full flex flex-col'}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-md font-medium">This Week's Income</CardTitle>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent className="flex-1 p-4">
      <div className="h-full">
        <WeeklyIncomeChart />
      </div>
    </CardContent>
  </Card>
</motion.div>

        <motion.div variants={itemVariants}>
          <Card className={"shadow-sm border w-full border-[#E2E2E2]"}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">Card Status Distribution</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <div className="h-[200px] w-[200px] mt-4 relative flex items-center justify-center">
                <CardStatusChart />
                <div className="absolute text-center">
                  <div className="text-sm text-gray-500">Total Cards</div>
                  <div className="text-2xl font-bold">2,450</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
    </ContentWrapper>
    </div>
  )
}



function QuickAccessCard({ icon, title, href }) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-3  px-2 py-1 truncate rounded-md bg-blue-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-[#002366] text-white">{icon}</div>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </motion.a>
  )
}



function StatCard({ icon, title, value, change, period, alert, color }) {
  const getIconColor = () => {
    switch (color) {
      case "green":
        return "text-green-500"
      case "blue":
        return "text-blue-500"
      case "purple":
        return "text-purple-500"
      case "orange":
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  const getChangeColor = () => {
    if (!change) return ""
    return change.startsWith("+") ? "text-green-500" : "text-gray-500"
  }

  const getIcon = () => {
    switch (icon) {
      case "card":
        return (
          <div className=" ">
            <CreditCard className={`h-5 w-5 ${getIconColor()}`} />
          </div>
        )
      case "personalized":
        return (
          <div className="">
            <CreditCard className={`h-5 w-5 ${getIconColor()}`} />
          </div>
        )
      case "revenue":
        return (
          <div className="p-">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={getIconColor()}
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        )
      case "pending":
        return (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={getIconColor()}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="bg-white p-2 rounded-md shadow-sm border border-[#E2E2E2] space-y-3"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="leading-0">
        {getIcon()}
        <div className="text-sm text-[#0000008F] font-medium">{title}</div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-bold mb-2">{value}</div>
      {change && (
        <div className="flex items-center text-xs">
          <span className={`${getChangeColor()} bg-green-100 flex px-2 py-[.5px] shadow-none items-center rounded-md gap-1`}><img className="object-fit w-3 h-3" src={arrUp}/> {change}</span>
          {period && <span className="text-gray-500 ml-1 ">{period}</span>}
        </div>
      )}
      </div>

    </motion.div>
  )
}

function MonthlyIssuanceChart() {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const personalizedData = [25, 65, 15, 85, 30, 40, 45];
  const instantData = [40, 90, 30, 90, 35, 60, 85];
  const yAxisLabels = [100, 80, 60, 40, 20, 0];
  const maxValue = 100; // Maximum value for scaling

  return (
    <div className="w-full h-full flex">
      {/* Y-axis labels and grid lines */}
      <div className="flex flex-col justify-between mr-2 h-full">
        {yAxisLabels.map((label) => (
          <div key={label} className="relative flex  items-center justify-end h-0">
            <span className="text-xs text-gray-400  mb-10">{label}</span>
            <div className="absolute right-0 w-[calc(100%+1rem)] h-px bg-gray-100 -translate-y-1/2"></div>
          </div>
        ))}
      </div>

      {/* Main chart area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 flex flex-col justify-between">
            {yAxisLabels.slice(1).map((_, index) => (
              <div 
                key={`line-${index}`} 
                className="w-full h-px -mb-3 bg-gray-100"
              ></div>
            ))}
          </div>

          {/* Bars container - aligned to bottom */}
          <div className="absolute -bottom-5 w-full flex items-end justify-between h-full">
            {months.map((month, index) => (
              <div key={month} className="flex flex-col items-center h-full">
                <div className="relative w-8 sm:w-10 h-full flex items-end">
                  {/* Instant (light blue) bar */}
                  <motion.div
                    className="w-full bg-[#CCE2FF] rounded-t-sm"
                    style={{ height: `${(instantData[index]/maxValue)*100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(instantData[index]/maxValue)*100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                  {/* Personalized (dark blue) bar */}
                  <motion.div
                    className="absolute bottom-0 w-full bg-[#014DAF] rounded-t-sm"
                    style={{ height: `${(personalizedData[index]/maxValue)*100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(personalizedData[index]/maxValue)*100}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{month}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        {/* <div className="flex flex-end justify-center gap-4 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#014DAF] rounded-sm mr-1" />
            <span className="text-xs">Personalized</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#CCE2FF] rounded-sm mr-1" />
            <span className="text-xs">Instant</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
function WeeklyIncomeChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dataPoints = [50, 39, 45, 38, 39, 17, 38, 40, 57, 38, 59, 29, 78];
  const yAxisLabels = [100, 80, 60, 40, 20, 0];
  const maxValue = 100;

  const points = dataPoints.map((point, i) => ({
    x: (i / (dataPoints.length - 1)) * 100,
    y: 100 - (point / maxValue) * 100,
  }));

  const pathData = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + point.x) / 2;
    return `${acc} S ${cpx},${prev.y} ${point.x},${point.y}`;
  }, "");

  return (
    <div className="w-full h-72 flex">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between mr-2 h-full">
        {yAxisLabels.map((label) => (
          <div key={label} className="text-xs text-gray-500 h-[16.6%] flex items-center justify-end pr-1">
            {label}
          </div>
        ))}
      </div>

      {/* Chart container */}
      <div className="flex-1 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {yAxisLabels.slice(1).map((_, index) => (
            <div
              key={`line-${index}`}
              className="w-full h-px bg-gray-200"
            ></div>
          ))}
        </div>

        {/* SVG Chart */}
        <div className="w-full h-full pl-2 pr-4 pb-6">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Area fill */}
            <motion.path
              d={`${pathData} L 100,100 L 0,100 Z`}
              fill="rgba(34, 197, 94, 0.1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Line path */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Data points */}
            {points.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill="white"
                stroke="#22c55e"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 + i * 0.05 }}
              />
            ))}
          </svg>
        </div>

        {/* X-axis day labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {days.map((day, index) => (
            <div key={index} className="text-xs text-gray-500 text-center" style={{ width: `${100 / days.length}%` }}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardStatusChart() {
  // Data for the donut chart
  const data = [
    { name: "Active", value: 60, color: "#01A4AF" },
    { name: "Expired", value: 15, color: "#f59e0b" },
    { name: "Inactive", value: 10, color: "#3b82f6" },
    { name: "Blocked", value: 10, color: "#8b5cf6" },
    { name: "Lost", value: 5, color: "#ef4444" },
  ]

  const total = data.reduce((acc, item) => acc + item.value, 0)
  let cumulativePercent = 0

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <defs>
          {data.map((item, index) => (
            <motion.path
              key={`path-${index}`}
              id={`path-${index}`}
              strokeLinecap="round"
              d={describeArc(
                21,
                21,
                15.91549430918954,
                cumulativePercent * 3.6,
                (cumulativePercent += (item.value / total) * 100) * 3.6,
              )}
              fill="transparent"
            />
          ))}
        </defs>

        {data.map((item, index) => {
          const startPercent =
            index === 0 ? 0 : (data.slice(0, index).reduce((acc, curr) => acc + curr.value, 0) / total) * 100
          const endPercent = startPercent + (item.value / total) * 100

          return (
            <motion.circle
              key={index}
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={item.color}
              strokeWidth="2.5"
              strokeDasharray={`${(item.value / total) * 100} ${100 - (item.value / total) * 100}`}
              strokeDashoffset={100 - startPercent}
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - startPercent }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          )
        })}
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 text-xs">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to describe an arc for SVG paths
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ")
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}
