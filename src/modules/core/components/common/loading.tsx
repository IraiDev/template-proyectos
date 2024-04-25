import { Spinner } from "@nextui-org/react"

type Props = {
  label?: string
}

export const Loading = ({ label }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Spinner />
      <span>{label ?? "Cargando..."}</span>
    </div>
  )
}
