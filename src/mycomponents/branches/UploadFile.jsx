

import { useState, useRef } from "react"
import { X, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"



export default function UploadFileDialog({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      simulateUpload()
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      simulateUpload()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval)
          return 80
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSubmit = () => {
    // Complete the upload
    setUploadProgress(100)

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false)
      setFile(null)
      onClose()
    }, 500)
  }

  const handleCancel = () => {
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    onClose()
  }

  const handleDeleteFile = () => {
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white backdrop-blur-md border border-white/10 shadow-xl rounded-xl">

        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">Upload CSV File</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">CSV file should contain the following columns</p>
            </div>
          </div>
          {/* <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="mt-2">
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Name</li>
            <li>Code</li>
            <li>Address</li>
            <li>Zone</li>
            <li>Area</li>
          </ul>
        </div>

        <div
          className={`mt-4 border-2 border-dashed rounded-md p-6 text-center ${file ? "border-blue-200 bg-blue-50" : "border-gray-200"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx" onChange={handleFileChange} />

          <div className="flex flex-col items-center justify-center">
            <div className="mb-3 bg-gray-100 rounded-full p-3">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <button type="button" onClick={handleClickUpload} className="text-blue-600 font-medium">
              Click to upload
            </button>
            <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
            <p className="text-xs text-gray-400 mt-2">CSV, XSLX (max. 10mb)</p>
          </div>
        </div>

        {file && (
          <div className="mt-4 border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                  <span className="text-xs font-medium text-green-700">CSV</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDeleteFile}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-right mt-1 text-gray-500">{uploadProgress}%</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="bg-[#002366] hover:bg-[#002366]" onClick={handleSubmit} disabled={!file}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
