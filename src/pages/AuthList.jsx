
import { useState } from "react"
import { Search, SlidersHorizontal, Settings } from "lucide-react"
import Header from "@/mycomponents/Header"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"


export default function AuthorizationListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [authItems, setAuthItems] = useState([
    { id: 1, menu: "Users", access: "Create", enabled: true },
    { id: 2, menu: "Users", access: "Edit", enabled: true },
    { id: 3, menu: "Roles", access: "Full", enabled: true },
    { id: 4, menu: "Roles", access: "Create", enabled: false },
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

  const handleToggleEnabled = (id) => {
    setAuthItems(
      authItems.map((item) => {
        if (item.id === id) {
          return { ...item, enabled: !item.enabled }
        }
        return item
      }),
    )
  }

  const handleConfigure = (id) => {
    // Configure authorization
    console.log("Configure", id)
  }

  const filteredItems = authItems.filter((item) => {
    return (
      searchQuery === "" ||
      item.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.access.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
  <div className="h-full">
    <Header/>
    <ContentWrapper>
       <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Authorization List</h1>
        <p className="text-gray-600">Shows list of all users with authorized roles.</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search user"
              className="pl-10 pr-4 bg-white py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="text-left py-3 px-4 font-medium text-gray-600">Menu</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Access</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Enabled</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.menu}</td>
                  <td className="py-3 px-4">{item.access}</td>
                  <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.enabled}
                        onChange={() => handleToggleEnabled(item.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-gray-600 hover:text-gray-800 flex items-center"
                      onClick={() => handleConfigure(item.id)}
                    >
                      <span className="mr-1">Configure</span>
                      <Settings size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                    No items found
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
