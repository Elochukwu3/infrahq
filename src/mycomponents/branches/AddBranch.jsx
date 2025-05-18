import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export function AddBranchDialog({ isOpen, onClose, onAddBranch }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    zone: "",
    area: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBranch(formData)
    setFormData({
      name: "",
      code: "",
      address: "",
      zone: "",
      area: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-md bg-white backdrop-blur-md border border-white/20 shadow-xl">

        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">Add Branch</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Fill in branch details.</p>
            </div>
          </div>
          {/* <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Head Office"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">
              Code<span className="text-red-500">*</span>
            </Label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} placeholder="000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Lekki"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone">
              Zone<span className="text-red-500">*</span>
            </Label>
            <Input id="zone" name="zone" value={formData.zone} onChange={handleChange} placeholder="LG" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">
              Area<span className="text-red-500">*</span>
            </Label>
            <Input id="area" name="area" value={formData.area} onChange={handleChange} placeholder="SW" required />
          </div>

          <Button type="submit" className="bg-[#002366] hover:bg-[#002366] text-gray-100 mt-4">
            Add Branch
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
