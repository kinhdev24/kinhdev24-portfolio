import ControlCenter from "@/components/layouts/control-center"
import { MacosDock } from "@/components/layouts/dock"
import Launchpad from "@/components/layouts/launchpad"
import Menubar from "@/components/layouts/menu-bar"

export default function Home() {
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-[url('/images/macos-big-sur-abstract.png')] bg-cover bg-center relative">
      <Menubar />
      <MacosDock />
      <Launchpad />
      <ControlCenter />
    </div>
  )
}
