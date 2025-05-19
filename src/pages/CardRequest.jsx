
import { useState } from "react"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"

export default function CardRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [requests, setRequests] = useState([
    {
      id: 1,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Ready",
    },
    {
      id: 2,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Ready",
    },
    {
      id: 3,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "In Progress",
    },
    {
      id: 4,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 5,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Acknowledged",
    },
  ])

  const filteredRequests = requests.filter((request) =>
    request.branch.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full">
      <Header icon={navItems[7].icon} label={navItems[7].label}/>
      <ContentWrapper>
<div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Card Request</h1>
        <p className="text-gray-600">View and attend to card requests here.</p>
      </div>

      <div className="mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by branch"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Initiator</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Batch</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Date Requested</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{request.branch}</td>
                <td className="py-3 px-4">{request.initiator}</td>
                <td className="py-3 px-4">{request.quantity}</td>
                <td className="py-3 px-4">{request.batch}</td>
                <td className="py-3 px-4">{request.dateRequested}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={request.status} />
                </td>
                <td className="py-3 px-4">
                  <Link to={`/dashboard/card-request/${request.id}`}>
                    <span className="text-[#002366] hover:text-blue-800">View</span>
                  </Link>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </ContentWrapper>
    </div>
  )
}

function StatusBadge({ status }) {
  let bgColor = ""
  let textColor = ""

  switch (status) {
    case "Pending":
      bgColor = "bg-gray-200"
      textColor = "text-gray-800"
      break
    case "In Progress":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-800"
      break
    case "Ready":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      break
    case "Acknowledged":
      bgColor = "bg-blue-100"
      textColor = "text-blue-800"
      break
    default:
      bgColor = "bg-gray-200"
      textColor = "text-gray-800"
  }

  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>{status}</span>
}
