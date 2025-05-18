import { useState } from "react"
import { Search, SlidersHorizontal, Eye } from "lucide-react"
import Header from "@/mycomponents/Header"

export default function TrailPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [trails, setTrails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  const handleViewTrail = (id) => {
    // View trail details
    console.log("View trail", id)
  }

  return (
   <div className="h-full">
    <Header/>
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Trail</h1>
        <p className="text-gray-600">View details of different card trails here.</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">State</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Time Stamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center">
                    <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </td>
                </tr>
              ) : trails.length > 0 ? (
                trails.map((trail) => (
                  <tr key={trail.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{trail.actor}</td>
                    <td className="py-3 px-4">{trail.event}</td>
                    <td className="py-3 px-4">{trail.state}</td>
                    <td className="py-3 px-4">{trail.device}</td>
                    <td className="py-3 px-4">{trail.timestamp}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewTrail(trail.id)}>
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                    No trails found
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
   </div> 
  )
}
