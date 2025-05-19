import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ComplaintDetailsDialog({ isOpen, onClose, complaint }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-red-50">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#002366]">Complaint Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Complaint Category</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">Card Dispute</div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Branch</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">Head Office</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Account Number</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">{complaint.accountNumber}</div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Customer Name</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">{complaint.customerName}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-2">Complaint Details</h3>
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[100px]">
              {complaint.details || "Complaint details..."}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Submission Date</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">{complaint.submissionDate}</div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Status</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <Badge className="bg-[#002366]/10 text-[#002366] hover:bg-[#002366]/20">
                  {complaint.status || "Resolved"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Resolved By</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                {complaint.resolvedBy || "Manager"}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Attachment</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                {complaint.attachment || "None"}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">Resolution Date</h3>
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              {complaint.resolutionDate || complaint.submissionDate}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}