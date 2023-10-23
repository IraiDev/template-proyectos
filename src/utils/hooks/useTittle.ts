import { useLayoutEffect } from "react"

export function useTitle(title: string) {
  useLayoutEffect(() => {
    document.title = `template | ${title}`
  }, [title])
}
