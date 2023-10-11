import { PrivateGuard } from "@router/guards"

function PrivateLayout() {
  return (
    <main className="min-h-screen w-full">
      <div className="container max-w-6xl mx-auto flex flex-col gap-4 py-10">
        <PrivateGuard />
      </div>
    </main>
  )
}

export default PrivateLayout
