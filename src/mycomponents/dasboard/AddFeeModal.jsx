import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { motion } from "framer-motion"

function AddFeeModal({ onClose, onAddFee }) {
  const modalRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "Maintenance",
    value: 0,
    currency: "NGN",
    frequency: "One Off",
    impact: "Issuance",
    accountPad: "None",
    account: "",
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddFee(formData)
  }

  const radioGroups = [
    {
      name: "currency",
      label: "Currency",
      options: ["NGN", "USD"]
    },
    {
      name: "frequency",
      label: "Fee Frequency",
      options: ["One Off", "Monthly"]
    },
    {
      name: "impact",
      label: "Fee Impact",
      options: ["Issuance", "Pin Reissue"]
    },
    {
      name: "accountPad",
      label: "Account Pad",
      options: ["None", "Branch Code Prefix", "Branch Code Suffix"],
      fullWidth: true
    }
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div 
          ref={modalRef}
          className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Add Fee</h2>
                  <p className="text-sm text-gray-500">Fill in fee details</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fee Name<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Maintenance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input
                  type="number"
                  name="value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.value}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>

              {radioGroups.map((group) => (
                <div key={group.name}>
                  <label className="block text-sm font-medium mb-2">{group.label}</label>
                  <div className={`flex ${group.fullWidth ? 'flex-wrap' : 'flex-wrap md:flex-nowrap'} gap-4`}>
                    {group.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={formData[group.name] === option}
                          onChange={() => handleRadioChange(group.name, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1">Account</label>
                <input
                  type="text"
                  name="account"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.account}
                  onChange={handleChange}
                  disabled={formData.accountPad === "None"}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#002366]  text-white py-2.5 rounded-md transition-colors"
                >
                  Add Fee
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default AddFeeModal