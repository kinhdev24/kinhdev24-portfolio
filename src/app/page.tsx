import Content from "@/components/layouts/content"
import Taskbar from "@/components/layouts/taskbar"
import WindowLoading from "@/components/ui/window-loading"

export default function DesktopPortfolio() {
  return (
    <div className="min-h-dvh w-dvw bg-[url('/images/wallpapers.jpg')] bg-cover bg-center overflow-hidden relative flex flex-col justify-between">
      <WindowLoading />
      <Content />
      <Taskbar />
    </div>
  )
}
