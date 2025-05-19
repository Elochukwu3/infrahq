import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { ComplaintsLog } from "@/mycomponents/dasboard/ComplaintLog"
import { navItems } from "@/mycomponents/Sdebar"

export default function ResolutionPage() {
  return (
    <div className="h-full">
        <Header icon={navItems[11].icon} label={navItems[11].label}/>
        <ContentWrapper>
            <ComplaintsLog />
        </ContentWrapper>
    </div>
  )
}
