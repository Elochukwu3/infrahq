import { useState } from "react"
import { Search, Trash2, Edit2, Plus, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"
import CreateUserModal from "@/mycomponents/dasboard/CreateUserModal"

export default function UsersPage() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/09/2024 08:41:37",
    },
    {
      id: 2,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/09/2024 08:41:37",
    },
    {
      id: 3,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/09/2024 08:41:37",
    },
  ])

  const handleCreateUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      username: userData.username,
      phone: userData.phone,
      email: userData.email,
      dateCreated: new Date().toLocaleString(),
    }

    setUsers([...users, newUser])
    setIsCreateUserModalOpen(false)
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
   <div className="h-full">
  <Header icon={navItems[4].icon} label={navItems[4].label} />
  <ContentWrapper>
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <p className="text-gray-600">
          Manage your users, create users, view and edit users. Assign roles to users here.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by username"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="bg-[#002366] hover:bg-[#001a4d] text-white px-4 py-2 rounded-md flex items-center transition-colors w-full md:w-auto justify-center"
          onClick={() => setIsCreateUserModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          <span className="whitespace-nowrap">Create User</span>
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Username</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.dateCreated}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isCreateUserModalOpen && (
          <CreateUserModal onClose={() => setIsCreateUserModalOpen(false)} onCreateUser={handleCreateUser} />
        )}
      </AnimatePresence>
    </div>
  </ContentWrapper>
</div>
  )
}

// function CreateUserModal({
//   onClose,
//   onCreateUser,
// }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     accessLevel: "",
//     branch: "",
//     role: "",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onCreateUser(formData)
//   }

//   return (
//     <>
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         transition={{ duration: 0.2 }}
//         className="fixed inset-0 flex items-center justify-center z-50 px-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <div className="bg-gray-100 p-2 rounded-full mr-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Create User</h2>
//                   <p className="text-gray-500 text-sm">Fill in user details and assign role.</p>
//                 </div>
//               </div>
//               <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Username<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="User"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     First name<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="Nazeer"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Last name<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Ajibola"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Email address<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Ajibola"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Phone<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="09012345678"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Password<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="********"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Access Level</label>
//                   <div className="relative">
//                     <select
//                       name="accessLevel"
//                       className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                       value={formData.accessLevel}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>
//                         Select level from dropdown
//                       </option>
//                       <option value="admin">Admin</option>
//                       <option value="manager">Manager</option>
//                       <option value="user">User</option>
//                     </select>
//                     <ChevronDown
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={18}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Branch</label>
//                   <div className="relative">
//                     <select
//                       name="branch"
//                       className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                       value={formData.branch}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>
//                         Select branch from dropdown
//                       </option>
//                       <option value="headquarters">Headquarters</option>
//                       <option value="branch1">Branch 1</option>
//                       <option value="branch2">Branch 2</option>
//                     </select>
//                     <ChevronDown
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={18}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Assign Role</label>
//                   <div className="relative">
//                     <select
//                       name="role"
//                       className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                       value={formData.role}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>
//                         Select role from dropdown
//                       </option>
//                       <option value="admin">Admin</option>
//                       <option value="manager">Manager</option>
//                       <option value="staff">Staff</option>
//                     </select>
//                     <ChevronDown
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={18}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Create user
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   )
// }
