import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <main className="min-h-screen bg-default-100 flex text-default-800 w-full">
      <Outlet />
    </main>
  )
}
export default AppLayout
