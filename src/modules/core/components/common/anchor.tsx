import { twclx } from "src/helpers/tailwind"

type Props = JSX.IntrinsicElements["a"]

const Anchor = ({ className, ...props }: Props) => {
  return (
    <a
      target="_blank"
      className={twclx(
        "text-blue-500 hover:underline underline-offset-2 transition-all flex-1 truncate font-semibold",
        className,
      )}
      {...props}
    />
  )
}

export default Anchor
