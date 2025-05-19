import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { ComplaintsLog } from "@/mycomponents/dasboard/ComplaintLog"
import { navItems } from "@/mycomponents/Sdebar"

export default function ComplaintsLogPage() {
  return (
    <div className="h-full">
        <Header icon={navItems[12].icon} label={navItems[12].label}/>
        <ContentWrapper>
            <ComplaintsLog />
        </ContentWrapper>
    </div>
  )
}
