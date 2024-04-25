import { Helmet } from "react-helmet"

type Props = {
  title: string
  tabTitle: string
  children: React.ReactNode
}

const AuthLayout = ({ children, tabTitle, title }: Props) => {
  return (
    <>
      <Helmet>
        <title>{tabTitle}</title>
      </Helmet>

      <main className="h-screen grid place-content-center gap-2 bg-white">
        <h1 className="text-2xl font-bold">{title}</h1>

        {children}

        <span className="text-tiny text-center inline-block mt-3 leading-none">
          powered by ZionIT
        </span>
      </main>
    </>
  )
}
export default AuthLayout
