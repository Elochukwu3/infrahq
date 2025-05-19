
import { useState } from "react"
import { Search, Calendar, SlidersHorizontal, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ComplaintDetailsDialog from "./ComplaintDetailsDialog"
import { LogComplaintDialog } from "./LogComplaintDialog"

// Sample data for complaints
const complaintsData = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    accountNumber: "0123456789",
    customerName: "Nazeer Ajiboła",
    submissionDate: "11/14/2024 10:27:43",
    category: "Card Dispute",
    status: "Pending",
  }))

export function ComplaintsLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [isLogComplaintOpen, setIsLogComplaintOpen] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleRowClick = (complaint) => {
    setSelectedComplaint(complaint)
    setIsDetailsOpen(true)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Complaints: Log</h1>
        <p className="text-gray-500">View details of logged complaints and log new ones here.</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <Tabs defaultValue="pending" onValueChange={setActiveTab}>
            <TabsList className="grid w-[250px] grid-cols-2">
              <TabsTrigger value="pending" className="rounded-md">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#002366] mr-2"></span>
                  Pending
                </div>
              </TabsTrigger>
              <TabsTrigger value="resolved" className="rounded-md">
                Resolved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search complaint"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
            <Button
              className="bg-[#002366] text-gray-50 hover:bg-[#002366] flex items-center gap-2 ml-auto md:ml-0"
              onClick={() => setIsLogComplaintOpen(true)}
            >
              <FileText className="h-4 w-4" />
              Log Complaint
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Account Number</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintsData.map((complaint) => (
                <TableRow
                  key={complaint.id}
                  className="cursor-pointer hover:bg-gray-50 text-gray-500"
                  onClick={() => handleRowClick(complaint)}
                >
                  <TableCell>{complaint.accountNumber}</TableCell>
                  <TableCell>{complaint.customerName}</TableCell>
                  <TableCell>{complaint.submissionDate}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Page 1 of 20</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      <LogComplaintDialog isOpen={isLogComplaintOpen} onClose={() => setIsLogComplaintOpen(false)} />
              
      {selectedComplaint && (
        <ComplaintDetailsDialog
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          complaint={selectedComplaint}
        />
      )}
    </div>
  )
}
