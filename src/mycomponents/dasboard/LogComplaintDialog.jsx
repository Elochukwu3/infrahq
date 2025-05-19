import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LogComplaintDialog({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    accountNumber: "",
    customerName: "",
    details: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Submitting complaint:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-y-auto  bg-white h-11/12 backdrop-blur-md border border-white/20 shadow-xl">
        <DialogHeader className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#002366]/10 text-[#002366]">
            <FileTextIcon className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-xl">Log Complaint</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">Select category and fill in details</p>
          </div>
          {/* <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category from dropdown" />
              </SelectTrigger>
              <SelectContent className={'bg-white'}>
                <SelectItem value="card_dispute">Card Dispute</SelectItem>
                <SelectItem value="transaction_issue">Transaction Issue</SelectItem>
                <SelectItem value="pin_issue">PIN Issue</SelectItem>
                <SelectItem value="card_activation">Card Activation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">
              Account Number<span className="text-red-500">*</span>
            </Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              placeholder="0123456789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">
              Customer Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleChange("customerName", e.target.value)}
              placeholder="Nazeer Ajiboła"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">
              Complaint Details<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) => handleChange("details", e.target.value)}
              placeholder="Describe complaint..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload File (optional)</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-gray-100 rounded-full p-3">
                  <Upload className="h-6 w-6 text-gray-500" />
                </div>
                <button type="button" className="text-[#002366] font-medium">
                  Click to upload
                </button>
                <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                <p className="text-xs text-gray-400 mt-2">PDF, JPG (max. 10mb)</p>
              </div>
            </div>
          </div>

          <Button className="w-full bg-[#002366] text-gray-50 hover:bg-[#001a4d] mt-4" onClick={handleSubmit}>
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}