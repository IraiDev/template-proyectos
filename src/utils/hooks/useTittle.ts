import { useLayoutEffect } from "react"

export function useTitle(title: string) {
  useLayoutEffect(() => {
    document.title = `Curimapu Semillas ${title === "" ? "" : "|"} ${title}`
  }, [title])
}
