import { useState } from "react"
import { ChevronDown, Plus, X, Trash2, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"
import AddFeeModal from "@/mycomponents/dasboard/AddFeeModal"

export default function CreateProfilePage() {
  const [isAddFeeModalOpen, setIsAddFeeModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    currency: "NGN",
    expiration: "40",
    binPrefix: "",
    scheme: "",
    issuer: "",
  })
  const [fees, setFees] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddFee = (feeData) => {
    const newFee = {
      id: fees.length + 1,
      ...feeData,
    }
    setFees([...fees, newFee])
    setIsAddFeeModalOpen(false)
  }

  const handleRemoveFee = (id) => {
    setFees(fees.filter((fee) => fee.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ ...formData, fees })
  }

  return (
  <div className="h-full">
    <Header icon={<ChevronRight/>} iconBack={navItems[6].icon} labelTwo={"CardProfile"} iconTwo={<ChevronRight/>} back={true} label={"Create Profile"}/>
    <ContentWrapper>
       <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Create Profile</h1>
        <p className="text-gray-600">Fill in profile details and add card fee.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Currency<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="currency"
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Expiration (months)<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="expiration"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.expiration}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                BIN Prefix<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="binPrefix"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.binPrefix}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Card Scheme<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="scheme"
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={formData.scheme}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select card scheme</option>
                  <option value="verve">Verve</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="visa">Visa</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Issuer<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="issuer"
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={formData.issuer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select issuer</option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Card Fees</h2>
              <button
                type="button"
                className="bg-[#002366] text-white px-3 py-1 rounded-md flex items-center hover:bg-blue-700 transition-colors text-sm"
                onClick={() => setIsAddFeeModalOpen(true)}
              >
                <Plus size={16} className="mr-1" />
                Add Fee
              </button>
            </div>

            {fees.length > 0 ? (
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-2 px-4 font-medium text-gray-600">Fee Name</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-600">Value</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-600">Currency</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-600">Frequency</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee) => (
                      <tr key={fee.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4">{fee.name}</td>
                        <td className="py-2 px-4">{fee.value}</td>
                        <td className="py-2 px-4">{fee.currency}</td>
                        <td className="py-2 px-4">{fee.frequency}</td>
                        <td className="py-2 px-4">
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleRemoveFee(fee.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">No fees added yet. Click "Add Fee" to add a card fee.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/card-profiles")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#002366] text-white px-4 py-2 rounded-md transition-colors"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {isAddFeeModalOpen && <AddFeeModal onClose={() => setIsAddFeeModalOpen(false)} onAddFee={handleAddFee} />}
      </AnimatePresence>
    </div>
    </ContentWrapper>
  </div> 
  )
}

