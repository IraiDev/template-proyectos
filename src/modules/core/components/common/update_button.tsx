import { ICON_SIZE } from "@config/constants"
import { actions } from "@router/routes/actions"
import { IconPencil } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ButtonProps } from "@nextui-org/react"

type Props = {
  id: string | number
} & Pick<ButtonProps, "isDisabled" | "isLoading">

export const UpdateButton = ({ id }: Props) => {
  return (
    <>
      <Button
        as={Link}
        isIconOnly
        variant="light"
        color="default"
        to={`${actions.update}/${id}`}>
        <IconPencil size={ICON_SIZE.SM} />
      </Button>
    </>
  )
}
