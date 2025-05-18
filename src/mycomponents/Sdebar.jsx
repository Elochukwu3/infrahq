import { cn } from "@/lib/utils";
import {
  Home,
  GitBranch,
  Users,
  User,
  CreditCard,
  FileText,
  Package,
  List,
  Lock,
  Key,
  ClipboardList,
  CheckSquare,
  Layers,
  History,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-nbg.png";
import cardInfra from "@/assets/cardinfra-logo.png";

export const navItems = [
  { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
  { heading: "MAIN MENU" },
  { to: "/dashboard/branches", icon: <GitBranch size={18} />, label: "Branches" },
  { to: "/dashboard/roles", icon: <Users size={18} />, label: "Roles" },
  { to: "/dashboard/users", icon: <User size={18} />, label: "Users" },
  { to: "/dashboard/card-scheme", icon: <CreditCard size={18} />, label: "Card Scheme" },
  { to: "/dashboard/card-profile", icon: <FileText size={18} />, label: "Card Profile" },
  { to: "/dashboard/card-request", icon: <FileText size={18} />, label: "Card Request" },
  { to: "/dashboard/stock", icon: <Package size={18} />, label: "Stock" },
  { to: "/dashboard/cards", icon: <CreditCard size={18} />, label: "Cards" },
  { to: "/dashboard/block-unblock", icon: <Lock size={18} />, label: "Block/Unblock Card" },
  { to: "/dashboard/generate-reissue", icon: <Key size={18} />, label: "Generate/Reissue Pin" },
  { to: "/dashboard/complaints-log", icon: <ClipboardList size={18} />, label: "Complaints: Log" },
  { to: "/dashboard/complaints-resolve", icon: <CheckSquare size={18} />, label: "Complaints: Resolve" },
  { to: "/dashboard/authorization-list", icon: <List size={18} />, label: "Authorization List" },
  { to: "/dashboard/authorization-queue", icon: <Layers size={18} />, label: "Authorization Queue" },
  { to: "/dashboard/trail", icon: <History size={18} />, label: "Trail" },
  { to: "/dashboard/account", icon: <User size={18} />, label: "Account" },
];

export default function     Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[230px] font-satoshi lg:h-full h-scree flex flex-col bg-[#002366] text-white">
      <div className="p-4">
        <img src={logo} alt="LAPO Logo" width={120} height={40} />
      </div>

      <div className="flex-1 py-4 overflow-y-auto max-h-[calc(100vh-210px)]
       [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-[#002366]
  [&::-webkit-scrollbar-thumb]:bg-[#AEBAC9]
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 
      ">
        <nav className="space-y-1 px-3">
          {navItems.map((item, idx) =>
            item.heading ? (
              <div key={idx} className="px-4 py-2 text-xs text-[#7E8B9C] font-light">
                {item.heading}
              </div>
            ) : (
              <SidebarItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            )
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-[#7E8B9C]">
        <button
          type="button"
          className="flex items-center text-white hover:text-blue-200 w-full transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-start">
          <p className="text-[9px] text-[#7E8B9C]">POWERED BY</p>
          <img
            src={cardInfra}
            alt="Cardinfra Logo"
            className="mt-2 brightness-200 h-[42px] w-[93.3px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center font-satoshi px-3 py-2 text-xs rounded-md transition-all duration-200 group",
        active
          ? "bg-[#E4F0FF] text-[#014DAF]"
          : "text-[#D0D5DD] hover:bg-[#E4F0FF] hover:text-[#014DAF]"
      )}
    >
      <span className={cn("mr-3 text-[#D0D5DD] group-hover:text-[#014DAF]", active && "text-[#014DAF]")}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
