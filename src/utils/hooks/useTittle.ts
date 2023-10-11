import { useLayoutEffect } from "react"

export function useTitle(title: string) {
  useLayoutEffect(() => {
    document.title = `Apuntes | ${title}`
  }, [title])
}
