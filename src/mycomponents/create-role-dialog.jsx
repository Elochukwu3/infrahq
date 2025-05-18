import { useState } from "react"
import { X, Plus, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import ContentWrapper from "./layout/ContentWrapper"
import Header from "./Header"
import { navItems } from "./Sdebar"

// Define the menu items and permissions
const menuItems = [
  "Branch",
  "User",
  "Role",
  "Cards",
  "Card Request",
  "Authorization List",
  "Authorization Queue",
  "Activity",
]

const permissionTypes = ["Full", "Create", "Edit", "View", "Delete"]

export default function CreateRolePage({ onCreateRole }) {
  const [roleName, setRoleName] = useState("")
  const [permissions, setPermissions] = useState({})

  const handlePermissionChange = (menuItem, permissionType, checked) => {
    setPermissions((prev) => {
      const menuPermissions = prev[menuItem] || {}

      // If "Full" is being checked, check all other permissions
      if (permissionType === "Full" && checked) {
        const updatedMenuPermissions = {}
        permissionTypes.forEach((type) => {
          updatedMenuPermissions[type] = true
        })
        return { ...prev, [menuItem]: updatedMenuPermissions }
      }

      // If "Full" is being unchecked, uncheck all other permissions
      if (permissionType === "Full" && !checked) {
        const updatedMenuPermissions = {}
        permissionTypes.forEach((type) => {
          updatedMenuPermissions[type] = false
        })
        return { ...prev, [menuItem]: updatedMenuPermissions }
      }

      // If any other permission is being changed
      const updatedMenuPermissions = { ...menuPermissions, [permissionType]: checked }

      // Check if all permissions are checked, then also check "Full"
      if (permissionType !== "Full") {
        const allChecked = permissionTypes
          .filter((type) => type !== "Full")
          .every((type) => updatedMenuPermissions[type])

        updatedMenuPermissions["Full"] = allChecked
      }

      return { ...prev, [menuItem]: updatedMenuPermissions }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateRole({ name: roleName, permissions })
    setRoleName("")
    setPermissions({})
  }

  const resetForm = () => {
    setRoleName("")
    setPermissions({})
  }

  return (
    <div className="h-full w-full
    ">
      <Header back={true} iconBack={navItems[4].icon} iconTwo={<ChevronRight/>} 
      labelTwo={"Roles"} label={"Create Role"} icon={<ChevronRight/>}/>
      <ContentWrapper>
        <div className="w-full ">
      <div className="w-full bg-white shadow-none">
        <div className="p-6 max-md:px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Create Role</h1>
                <p className="text-sm text-gray-500 mt-1">Set role name, select privileges and permissions.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="roleName">
                Role name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                required
                className="max-w-md"
              />
            </div>

            <div className=" overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Menu Name</th>
                      {permissionTypes.map((type) => (
                        <th key={type} className="py-3 px-4 text-center font-medium text-gray-700 border-b">
                          {type}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((menuItem) => (
                      <motion.tr
                        key={menuItem}
                        className="border-b last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-700/60">{menuItem}</td>
                        {permissionTypes.map((permissionType) => (
                          <td key={`${menuItem}-${permissionType}`} className="py-3 px-4 text-center">
                            <Checkbox
                              id={`${menuItem}-${permissionType}`}
                              checked={permissions[menuItem]?.[permissionType] || false}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(menuItem, permissionType, checked)
                              }
                              className="mx-auto"
                            />
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#002366] hover:bg-[#002366]/70 cursor-pointer text-white">
                Create Role
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </ContentWrapper>
    </div>
  )
}