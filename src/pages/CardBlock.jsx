import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"



export default function BlockUnblockCardPage() {
  const [accountNumber, setAccountNumber] = useState("")
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchCards = (account) => {
    setIsLoading(true)
    setHasSearched(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      if (account) {
        // Mock data
        const mockCards = [
          {
            id: 1,
            maskedPAN: "50611*******6382",
            dateIssued: "11/14/2024 10:27:43",
            expiry: "32 months",
            batch: "847264905",
            isBlocked: true,
          },
          {
            id: 2,
            maskedPAN: "50611*******6382",
            dateIssued: "11/14/2024 10:27:43",
            expiry: "32 months",
            batch: "847264905",
            isBlocked: true,
          },
          {
            id: 3,
            maskedPAN: "50611*******6382",
            dateIssued: "11/14/2024 10:27:43",
            expiry: "32 months",
            batch: "847264905",
            isBlocked: false,
          },
        ]
        setCards(mockCards)
        setTotalPages(1)
      } else {
        setCards([])
        setTotalPages(0)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value)
  }

  const handleAccountNumberKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchCards(accountNumber)
    }
  }

  const handleToggleBlock = (id) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, isBlocked: !card.isBlocked }
        }
        return card
      }),
    )
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

  useEffect(() => {
    // If account number is pre-filled, fetch cards
    if (accountNumber) {
      fetchCards(accountNumber)
    }
  }, [])

  return (
    <div className="h-full">
      <Header icon={navItems[10].icon} label={navItems[10].label}/>
      <ContentWrapper>
 <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Block/Unblock Card</h1>
        <p className="text-gray-600">Attend to card block and unblock requests here.</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="mb-6">
          <label htmlFor="accountNumber" className="block text-sm font-medium mb-1">
            Account Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="accountNumber"
            className="w-full bg-white md:w-96 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002366]"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            onKeyDown={handleAccountNumberKeyDown}
            onBlur={() => fetchCards(accountNumber)}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#002366] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cards...</p>
          </div>
        ) : hasSearched ? (
          cards.length > 0 ? (
            <div>
              <div className="bg-gray-50 p-4 rounded-t-md border border-gray-200">
                <h2 className="text-lg font-medium">Available Cards</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Masked PAN</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date Issued</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Expiry</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Batch</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Block Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{card.maskedPAN}</td>
                        <td className="py-3 px-4">{card.dateIssued}</td>
                        <td className="py-3 px-4">{card.expiry}</td>
                        <td className="py-3 px-4">{card.batch}</td>
                        <td className="py-3 px-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={card.isBlocked}
                              onChange={() => handleToggleBlock(card.id)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4 px-4 py-2 bg-white border border-gray-200 rounded-b-md">
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
                    <span className="flex items-center">
                      <ChevronLeft size={16} className="mr-1" />
                      Previous
                    </span>
                  </button>
                  <button
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <span className="flex items-center">
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">No cards found for this account number.</p>
            </div>
          )
        ) : null}
      </div>
    </div>
      </ContentWrapper>
    </div>
  )
}
