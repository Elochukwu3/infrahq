

import { useState, useEffect } from "react"
import { FileDown, Activity, Package, Send, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from "react-router-dom"



export default function CardRequestDetailsPage() {
  const [request, setRequest] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [successDetails, setSuccessDetails] = useState("")
  const params = useParams()

  useEffect(() => {
    // In a real app, you would fetch the request data from your API
    // This is just a mock for demonstration
    setRequest({
      id: Number.parseInt(params.id),
      branch: "Corporate",
      initiator: "RootUser",
      cardType: "Classic Debit",
      cardCharges: "₦1,500",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    })
  }, [params?.id])

  const handleStatusChange = (newStatus) => {
    if (!request) return

    // Update the request status
    setRequest({ ...request, status: newStatus })

    // Show appropriate success message
    if (newStatus === "In Progress") {
      showSuccessModal("Request marked as in progress", "")
    } else if (newStatus === "Ready") {
      showSuccessModal("Request marked as ready", "")
    } else if (newStatus === "Acknowledged") {
      showSuccessModal("Request acknowledged", "")
    }
  }

  const handleDownloadForProduction = () => {
    // In a real app, you would trigger a file download here
    showSuccessModal("Successful", "Production file has been downloaded.")
  }

  const handleSendToDispatch = () => {
    if (!request) return

    // Update the request status
    setRequest({ ...request, status: "Dispatched" })

    // Show success message
    showSuccessModal("Successful", "Card batch successfully sent to dispatch.")
  }

  const showSuccessModal = (message, details) => {
    setSuccessMessage(message)
    setSuccessDetails(details)
    setIsSuccessModalOpen(true)
  }

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
  }

  if (!request) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading request details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Request Details</h1>
        <p className="text-gray-600">Perform predetermined actions on card requests here.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Card Request Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Branch Name</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.branch}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Initiator</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.initiator}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Card Type</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.cardType}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Card Charges</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.cardCharges}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.quantity}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Batch</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.batch}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Requested</label>
            <div className="p-3 bg-gray-100 rounded-md">{request.dateRequested}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <div className="inline-block">
              <StatusBadge status={request.status} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Actions</h3>
          <div className="flex flex-wrap gap-3">
            <ActionButton
              icon={<FileDown size={18} />}
              label="Download for Production"
              color="bg-gray-500 hover:bg-gray-600"
              onClick={handleDownloadForProduction}
            />
            <ActionButton
              icon={<Activity size={18} />}
              label="Mark as In Progress"
              color="bg-orange-400 hover:bg-orange-500"
              onClick={() => handleStatusChange("In Progress")}
            />
            <ActionButton
              icon={<Package size={18} />}
              label="Mark as Ready"
              color="bg-green-500 hover:bg-green-600"
              onClick={() => handleStatusChange("Ready")}
            />
            <ActionButton
              icon={<Send size={18} />}
              label="Send to Dispatch"
              color="bg-purple-500 hover:bg-purple-600"
              onClick={handleSendToDispatch}
            />
            <ActionButton
              icon={<CheckCircle size={18} />}
              label="Mark as Acknowledged"
              color="bg-blue-500 hover:bg-blue-600"
              onClick={() => handleStatusChange("Acknowledged")}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <SuccessModal message={successMessage} details={successDetails} onClose={closeSuccessModal} />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ status }) {
  let bgColor = ""
  let textColor = ""

  switch (status) {
    case "Pending":
      bgColor = "bg-gray-200"
      textColor = "text-gray-800"
      break
    case "In Progress":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-800"
      break
    case "Ready":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      break
    case "Dispatched":
      bgColor = "bg-purple-100"
      textColor = "text-purple-800"
      break
    case "Acknowledged":
      bgColor = "bg-blue-100"
      textColor = "text-blue-800"
      break
    default:
      bgColor = "bg-gray-200"
      textColor = "text-gray-800"
  }

  return <span className={`px-4 py-2 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>{status}</span>
}

function ActionButton({
  icon,
  label,
  color,
  onClick,
}) {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded-md text-white ${color} transition-colors`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function SuccessModal({
  message,
  details,
  onClose,
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{message}</h2>
            {details && <p className="text-gray-600 mb-6">{details}</p>}
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={onClose}
            >
              Continue
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
