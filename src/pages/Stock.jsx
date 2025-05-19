import ContentWrapper from "@/mycomponents/layout/ContentWrapper"
import Header from "@/mycomponents/Header"
import { navItems } from "@/mycomponents/Sdebar"

export default function StockPage() {
  return (
    <div className="h-full">
        <Header icon={navItems[8].icon} label={navItems[8].label}/>
        <ContentWrapper>
            <div>
                Stock
            </div>
        </ContentWrapper>
    </div>
  )
}
