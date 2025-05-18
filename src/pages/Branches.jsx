import { useEffect, useRef, useState } from "react";
import { Search, Plus, Upload, RefreshCw, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { AddBranchDialog } from "@/mycomponents/branches/AddBranch";
import UploadFileDialog from "@/mycomponents/branches/UploadFile";
import Header from "@/mycomponents/Header";
import { navItems } from "@/mycomponents/Sdebar";
import ContentWrapper from "@/mycomponents/layout/ContentWrapper";

const initialBranches = [
  {
    id: 1,
    name: "Head Office",
    code: "202",
    address: "Lekki",
    zone: "Lagos",
    dateAdded: "10/18/2024 14:39:58",
  },
  {
    id: 2,
    name: "Branch 2",
    code: "203",
    address: "Ikeja",
    zone: "Lagos",
    dateAdded: "10/20/2024 10:20:30",
  },
  {
    id: 3,
    name: "Branch 3",
    code: "204",
    address: "VI",
    zone: "Lagos",
    dateAdded: "10/22/2024 08:10:10",
  },
];

export function BranchesPage() {
  const [branches, setBranches] = useState(initialBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);

  const filteredBranches = branches.filter((branch) =>
    [branch.name, branch.code, branch.address, branch.zone].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddBranch = (newBranch) => {
    setBranches([
      ...branches,
      {
        ...newBranch,
        id: branches.length + 1,
        dateAdded: new Date().toLocaleString(),
      },
    ]);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="h-full">
      <Header icon={navItems[2].icon} label={navItems[2].label} />

      <ContentWrapper>
        <motion.div
          className="p-6 max-md:px-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-2xl font-semibold mb-2 text-[#002366]">
              Branches
            </h1>
            <p className="text-gray-500">
              Add branches, view branches and edit branches.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
          >
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search branch"
                className="pl-9 focus:ring-[#002366]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                onClick={() => setIsAddBranchOpen(true)}
                className="bg-[#002366] hover:bg-[#001a4d] text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Branch
              </Button>
              <Button
                variant="outline"
                className="border-[#002366] text-[#002366] hover:bg-[#002366]/10 flex items-center gap-2"
                onClick={() => setIsUploadFileOpen(true)}
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
              <Button
                variant="outline"
                className="border-[#002366] text-[#002366] hover:bg-[#002366]/10 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Update From Core
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white  shadow border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBranches.length > 0 ? (
                    filteredBranches.map((branch) => (
                      <TableRow key={branch.id} className="hover:bg-[#f0f4fa] text-slate-500">
                        <TableCell>{branch.name}</TableCell>
                        <TableCell>{branch.code}</TableCell>
                        <TableCell>{branch.address}</TableCell>
                        <TableCell>{branch.zone}</TableCell>
                        <TableCell>{branch.dateAdded}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:bg-red-100"
                            >
                              <Trash2
                                className="h-4 w-4"
                                onClick={() => handleDeleteBranch(branch.id)}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#002366] hover:bg-[#002366]/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No branches found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          <AddBranchDialog
            isOpen={isAddBranchOpen}
            onClose={() => setIsAddBranchOpen(false)}
            onAddBranch={handleAddBranch}
          />

          <UploadFileDialog
            isOpen={isUploadFileOpen}
            onClose={() => setIsUploadFileOpen(false)}
          />
        </motion.div>
      </ContentWrapper>
    </div>
  );
}
