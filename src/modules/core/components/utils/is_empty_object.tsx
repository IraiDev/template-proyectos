import { isEmptyObject } from "@helpers/helpers"

type Props<T extends object> = {
  evaluate: T
  children(value: T): React.ReactNode
}

const IsEmptyObject = <T extends object>({ evaluate, children }: Props<T>) => {
  if (isEmptyObject(evaluate)) return null

  return <>{children(evaluate)}</>
}

export default IsEmptyObject
