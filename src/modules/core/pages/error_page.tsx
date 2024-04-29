import { Link } from "react-router-dom"
import Button from "../components/ui/button"

const ErrorPage = () => {
  return (
    <div className="w-full flex-1 h-screen bg-white grid place-content-center">
      <article className="flex flex-col gap-6 items-center">
        <h1 className="text-7xl font-bold">Upps</h1>
        <p>Ha ocurrido un error</p>
        <Button as={Link} to="/" variant="flat" size="lg">
          Ir a la página princip al
        </Button>
      </article>
    </div>
  )
}
export default ErrorPage
