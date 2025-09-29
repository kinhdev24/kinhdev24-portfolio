import { create } from "zustand"

const moveAppToTop = (appsOpened: AppData[], appName: string) => {
  const app = appsOpened.find((app) => app.name === appName)
  if (!app) return appsOpened
  return [app, ...appsOpened.filter((app) => app.name !== appName)]
}

type AppData = {
  name: string
  isZoomed: boolean
  isHidden: boolean
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  appsOpened: [],
  toggleAppOpened: (appName) =>
    set((state) => ({
      appsOpened: state.appsOpened.find((app) => app.name === appName)
        ? state.appsOpened.filter((app) => app.name !== appName)
        : [
            { name: appName, isZoomed: false, isHidden: false },
            ...state.appsOpened,
          ],
    })),

  updateToTop: (appName) => {
    set((state) => ({
      appsOpened: moveAppToTop(state.appsOpened, appName),
    }))
  },

  zoomApp: (appName) => {
    set((state) => ({
      appsOpened: state.appsOpened.map((app) => ({
        ...app,
        isZoomed: app.name === appName,
      })),
    }))
  },

  hideApp: (appName) => {
    set((state) => ({
      appsOpened: state.appsOpened.map((app) =>
        app.name === appName ? { ...app, isHidden: true } : app
      ),
    }))
  },
}))

interface ApplicationStore {
  appsOpened: AppData[]
  toggleAppOpened: (appName: string) => void
  updateToTop: (appName: string) => void
  zoomApp: (appName: string) => void
  hideApp: (appName: string) => void
}
