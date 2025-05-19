

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import Header from "@/mycomponents/Header"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"

export default function AuthorizationQueuePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [requests, setRequests] = useState([
    {
      id: 1,
      initiator: "Nazeer",
      menu: "Branch",
      access: "Create",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 2,
      initiator: "Nazeer",
      menu: "Users",
      access: "Edit",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 3,
      initiator: "Nazeer",
      menu: "Roles",
      access: "Full",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 4,
      initiator: "Nazeer",
      menu: "Roles",
      access: "Create",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 5,
      initiator: "Nazeer",
      menu: "Card Request",
      access: "Full",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
  ])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleApprove = (id) => {
    setRequests(
      requests.map((request) => {
        if (request.id === id) {
          return { ...request, status: "Approved" }
        }
        return request
      }),
    )
  }

  const handleDecline = (id) => {
    setRequests(
      requests.map((request) => {
        if (request.id === id) {
          return { ...request, status: "Declined" }
        }
        return request
      }),
    )
  }

  const filteredRequests = requests.filter((request) => {
    return (
      searchQuery === "" ||
      request.initiator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.access.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
   <div className="h-full">
    <Header/>
    <ContentWrapper>
      <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Authorization Queue</h1>
        <p className="text-gray-600">Shows the different requests for authorized roles.</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search user"
              className="pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <SlidersHorizontal size={18} className="mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Initiator</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Menu</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Access</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date Requested</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{request.initiator}</td>
                  <td className="py-3 px-4">{request.menu}</td>
                  <td className="py-3 px-4">{request.access}</td>
                  <td className="py-3 px-4">{request.dateRequested}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {request.status === "Pending" && (
                      <div className="flex space-x-2">
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDecline(request.id)}>
                          Decline
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4 py-2">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 border border-gray-300 rounded-md ${
                currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-3 py-1 border border-gray-300 rounded-md ${
                currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </ContentWrapper>
   </div> 
  )
}
