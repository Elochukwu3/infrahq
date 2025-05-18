import { useState } from "react"
import { Search, Trash2, Edit2, Plus, X, CreditCard, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"

export default function CardSchemePage() {
  const [isAddSchemeModalOpen, setIsAddSchemeModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [schemes, setSchemes] = useState([
    {
      id: 1,
      name: "Verve",
      panLength: 18,
    },
    {
      id: 2,
      name: "Verve",
      panLength: 18,
    },
    {
      id: 3,
      name: "Verve",
      panLength: 18,
    },
  ])

  const handleAddScheme = (schemeData) => {
    const newScheme = {
      id: schemes.length + 1,
      name: schemeData.name,
      panLength: schemeData.panLength,
    }

    setSchemes([...schemes, newScheme])
    setIsAddSchemeModalOpen(false)
  }

  const handleDeleteScheme = (id) => {
    setSchemes(schemes.filter((scheme) => scheme.id !== id))
  }

  const filteredSchemes = schemes.filter((scheme) => scheme.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
   <div className="h-full">
    <Header
    icon={<CreditCard size={18} />}
    label="Card Scheme"
    />
    <ContentWrapper>
      <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Card Scheme</h1>
        <p className="text-gray-600">Add, view and edit card schemes here.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by scheme name"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#002366"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="bg-[#002366] text-white px-4 py-2 rounded-md flex items-center  transition-colors"
          onClick={() => setIsAddSchemeModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Scheme
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Scheme Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">PAN Length</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchemes.map((scheme) => (
              <tr key={scheme.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{scheme.name}</td>
                <td className="py-3 px-4">{scheme.panLength}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteScheme(scheme.id)}>
                      <Trash2 size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSchemes.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                  No schemes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isAddSchemeModalOpen && (
          <AddSchemeModal onClose={() => setIsAddSchemeModalOpen(false)} onAddScheme={handleAddScheme} />
        )}
      </AnimatePresence>
    </div>
    </ContentWrapper>
   </div> 
  )
}

function AddSchemeModal({
  onClose,
  onAddScheme,
}) {
  const [formData, setFormData] = useState({
    name: "",
    panLength: 0,
  })

  const panLengthOptions = [0, 16, 17, 18, 19]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePanLengthChange = (value) => {
    setFormData((prev) => ({ ...prev, panLength: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddScheme(formData)
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Add Card Scheme</h2>
                  <p className="text-gray-500 text-sm">Fill in scheme name and PAN length.</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Scheme Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Verve"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">PAN Length</label>
                  <div className="relative">
                    <div className="flex">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        value={formData.panLength}
                        readOnly
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 hidden">
                      {panLengthOptions.map((option) => (
                        <div
                          key={option}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handlePanLengthChange(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#002366] text-white py-3 rounded-md  transition-colors"
                >
                  Add Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  )
}
