import { useState } from "react"
import { Search, Trash2, Edit2, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"

export default function CardProfilesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Verve-1",
      currency: "NGN",
      expiration: "40 months",
      binPrefix: "50611234",
      dateCreated: "11/10/2024 23:21:03",
    },
    {
      id: 2,
      name: "Verve-2",
      currency: "USD",
      expiration: "36 months",
      binPrefix: "50611235",
      dateCreated: "10/10/2024 15:42:21",
    },
    {
      id: 3,
      name: "MasterCard-1",
      currency: "EUR",
      expiration: "60 months",
      binPrefix: "55211234",
      dateCreated: "09/10/2024 08:12:45",
    },
  ])

  const handleDeleteProfile = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles(profiles.filter((profile) => profile.id !== id))
    }
  }

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full">
      <Header icon={navItems[5].icon} label={navItems[5].label}/>
     <ContentWrapper>
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Card Profiles</h1>
          <p className="text-gray-600">Create, view and edit card profiles here.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by card name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#002366] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link 
            to="/dashboard/card-profiles/create" 
            className="w-full md:w-auto"
          >
            <button className="bg-[#002366] hover:bg-[#001a4d] text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors w-full">
              <Plus size={18} className="mr-2" />
              <span className="whitespace-nowrap">Add Profile</span>
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Card Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Currency</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Expiration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">BIN Prefix</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{profile.name}</td>
                    <td className="py-3 px-4">{profile.currency}</td>
                    <td className="py-3 px-4">{profile.expiration}</td>
                    <td className="py-3 px-4 font-mono">{profile.binPrefix}</td>
                    <td className="py-3 px-4">{profile.dateCreated}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                          onClick={() => handleDeleteProfile(profile.id)}
                          aria-label="Delete profile"
                        >
                          <Trash2 size={18} />
                        </button>
                        <Link 
                          to={`/dashboard/card-profiles/edit/${profile.id}`}
                          className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
                          aria-label="Edit profile"
                        >
                          <Edit2 size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProfiles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                      {searchQuery ? "No matching profiles found" : "No profiles available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </ContentWrapper> 
    </div>
  )
}