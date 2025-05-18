import { useState, useRef, useEffect } from "react"
import { X, ChevronDown, UserPlus } from "lucide-react"
import { motion } from "framer-motion"

const CreateUserModal = ({ onClose, onCreateUser }) => {
  const modalRef = useRef(null)
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    accessLevel: "",
    branch: "",
    role: "",
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateUser(formData)
  }

  const inputFields = [
    { name: "username", label: "Username", type: "text", placeholder: "User", required: true },
    { name: "firstName", label: "First name", type: "text", placeholder: "Nazeer", required: true },
    { name: "lastName", label: "Last name", type: "text", placeholder: "Ajibola", required: true },
    { name: "email", label: "Email address", type: "email", placeholder: "user@example.com", required: true },
    { name: "phone", label: "Phone", type: "tel", placeholder: "09012345678", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "********", required: true },
  ]

  const selectFields = [
    { 
      name: "accessLevel", 
      label: "Access Level", 
      options: [
        { value: "", label: "Select level from dropdown", disabled: true },
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "user", label: "User" },
      ] 
    },
    { 
      name: "branch", 
      label: "Branch", 
      options: [
        { value: "", label: "Select branch from dropdown", disabled: true },
        { value: "headquarters", label: "Headquarters" },
        { value: "branch1", label: "Branch 1" },
        { value: "branch2", label: "Branch 2" },
      ] 
    },
    { 
      name: "role", 
      label: "Assign Role", 
      options: [
        { value: "", label: "Select role from dropdown", disabled: true },
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "staff", label: "Staff" },
      ] 
    },
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
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Create User</h2>
                  <p className="text-sm text-gray-500">Fill in user details and assign role</p>
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
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}

              {selectFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <div className="relative">
                    <select
                      name={field.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      value={formData[field.name]}
                      onChange={handleChange}
                    >
                      {field.options.map((option) => (
                        <option 
                          key={option.value} 
                          value={option.value} 
                          disabled={option.disabled}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#002366]  text-white py-2.5 rounded-md transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CreateUserModal