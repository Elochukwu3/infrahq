import { useState } from "react"
import { Search, Plus, Trash2, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { motion } from "framer-motion"
import CreateRoleDialog from "@/mycomponents/create-role-dialog"
import { Link } from "react-router-dom"
import Header from "@/mycomponents/Header"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import { navItems } from "@/mycomponents/Sdebar"

const initialRoles = [
  { id: 1, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
  { id: 2, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
  { id: 3, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
  { id: 4, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
  { id: 5, name: "Admin", dateCreated: "11/07/2024 19:55:57" }
]

export function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateRole = (newRole) => {
    setRoles([
      ...roles,
      {
        ...newRole,
        id: roles.length + 1,
        dateCreated: new Date().toLocaleString()
      }
    ])
  }

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="h-full">
      <Header label={"Role"} icon={navItems[3].icon}/>
      <ContentWrapper>
        <motion.div className="p-6 max-md:p-3 " initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Roles</h1>
        <p className="text-gray-500">
          Manage your roles, create roles, view roles, and edit roles. Select privileges and set account permissions here.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search role"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Link
          to={'/dashboard/roles/create'}
          className="bg-[#002366] p-2 rounded-md text-gray-50 flex items-center hover:text-gray-150 font-semibold"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Role
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-sm border border-blue-50 shadow p-2 overflow-hidden">
        <div className="overflow-x-auto font-satoshi">
          <Table>
            <TableHeader className="bg-blue-50 text-[#002366]">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-blue-50/30">
                    <TableCell className="font-medium ">{role.name}</TableCell>
                    <TableCell className="text-sm text-gray-500">{role.dateCreated}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" onClick={() => handleDeleteRole(role.id)} />
                        </Button>
                        <Button  variant="ghost" size="icon" className="h-8 w-8 text-[#002366] hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    No roles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

    </motion.div>
      </ContentWrapper>
    </div>
  )
}
