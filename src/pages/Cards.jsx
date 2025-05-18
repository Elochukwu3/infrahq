"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, SlidersHorizontal, CreditCard } from "lucide-react"



export default function CardsPage() {
  const [selectedCardType, setSelectedCardType] = useState("Personalized")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(20)
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Generate mock data based on selected card type
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const mockCards = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        cardholder: "Nazeer Ajibola",
        maskedPAN: "50611*******6382",
        dateIssued:
          selectedCardType === "Personalized" || selectedCardType === "Instant" ? "11/14/2024 10:27:43" : undefined,
        dateRequested:
          selectedCardType === "Blocked" || selectedCardType === "Pin Reissue" ? "11/11/2024 09:23:37" : undefined,
        expiry: selectedCardType === "Personalized" || selectedCardType === "Instant" ? "32 months" : undefined,
        batch: "847264905",
        accountNumber: selectedCardType === "Blocked" || selectedCardType === "Pin Reissue" ? "1234567890" : undefined,
        initiator: selectedCardType === "Blocked" || selectedCardType === "Pin Reissue" ? "Nazeer Ajibola" : undefined,
      }))

      setCards(mockCards)
      setTotalPages(selectedCardType === "Personalized" || selectedCardType === "Instant" ? 20 : 1)
      setIsLoading(false)
    }, 500)
  }, [selectedCardType])

  const handleCardTypeChange = (cardType) => {
    setSelectedCardType(cardType)
    setCurrentPage(1)
  }

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

  const filteredCards = cards.filter((card) => {
    const searchFields = [card.cardholder, card.maskedPAN, card.batch, card.accountNumber, card.initiator].filter(
      Boolean,
    )

    return searchQuery === "" || searchFields.some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Cards</h1>
        <p className="text-gray-600">View all cards status here.</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <CardTypeButton
              type="Personalized"
              isSelected={selectedCardType === "Personalized"}
              onClick={() => handleCardTypeChange("Personalized")}
              position="first"
            />
            <CardTypeButton
              type="Instant"
              isSelected={selectedCardType === "Instant"}
              onClick={() => handleCardTypeChange("Instant")}
              position="middle"
            />
            <CardTypeButton
              type="Blocked"
              isSelected={selectedCardType === "Blocked"}
              onClick={() => handleCardTypeChange("Blocked")}
              position="middle"
            />
            <CardTypeButton
              type="Pin Reissue"
              isSelected={selectedCardType === "Pin Reissue"}
              onClick={() => handleCardTypeChange("Pin Reissue")}
              position="last"
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors">
            <CreditCard size={18} className="mr-2" />
            Issue Card
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search card"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Calendar size={18} className="mr-2" />
              Date
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={18} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cards...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {(selectedCardType === "Personalized" || selectedCardType === "Instant") && (
                      <>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Cardholder</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Masked PAN</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date Issued</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Expiry</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Batch</th>
                      </>
                    )}
                    {(selectedCardType === "Blocked" || selectedCardType === "Pin Reissue") && (
                      <>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Initiator</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Account Number</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Masked PAN</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date Requested</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredCards.map((card) => (
                    <tr key={card.id} className="border-b border-gray-200 hover:bg-gray-50">
                      {(selectedCardType === "Personalized" || selectedCardType === "Instant") && (
                        <>
                          <td className="py-3 px-4">{card.cardholder}</td>
                          <td className="py-3 px-4">{card.maskedPAN}</td>
                          <td className="py-3 px-4">{card.dateIssued}</td>
                          <td className="py-3 px-4">{card.expiry}</td>
                          <td className="py-3 px-4">{card.batch}</td>
                        </>
                      )}
                      {(selectedCardType === "Blocked" || selectedCardType === "Pin Reissue") && (
                        <>
                          <td className="py-3 px-4">{card.initiator}</td>
                          <td className="py-3 px-4">{card.accountNumber}</td>
                          <td className="py-3 px-4">{card.maskedPAN}</td>
                          <td className="py-3 px-4">{card.dateRequested}</td>
                        </>
                      )}
                    </tr>
                  ))}
                  {filteredCards.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        No cards found
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
          </>
        )}
      </div>
    </div>
  )
}



function CardTypeButton({ type, isSelected, onClick, position }) {
  const baseClasses = "px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none transition-colors"

  let positionClasses = ""
  if (position === "first") {
    positionClasses = "rounded-l-md"
  } else if (position === "last") {
    positionClasses = "rounded-r-md"
  }

  const stateClasses = isSelected
    ? "bg-white text-blue-600 border border-gray-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"

  return (
    <button type="button" className={`${baseClasses} ${positionClasses} ${stateClasses}`} onClick={onClick}>
      {isSelected && (
        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-blue-600 absolute left-4"></span>
        </span>
      )}
      <span className={isSelected ? "ml-3" : ""}>{type}</span>
    </button>
  )
}
