import { twclx } from "@utils/tailwind"
import CreateJsxElement from "../utils/create_jsx_element"

interface Props {
  className: string
  title: React.ReactNode
  children: JSX.Element[]
  classNames: { title: string }
  ref: React.RefObject<HTMLFormElement>
  titleAs: "h1" | "h2" | "h3" | "h4" | "h5"
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

const Form = ({
  ref,
  title,
  children,
  onSubmit,
  className,
  classNames,
  titleAs = "h2",
}: Partial<Props>) => {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className={twclx("flex flex-col gap-3 w-full", className)}
    >
      {title && (
        <header>
          <CreateJsxElement
            as={titleAs}
            className={twclx("font-2xl font-bold", classNames?.title)}
          >
            {title}
          </CreateJsxElement>
        </header>
      )}
      {children}
    </form>
  )
}

export default Form
