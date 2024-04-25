import { MyDate } from "@utils/date"

const HomeView = () => {
  const date = new MyDate()
  return <div>{date.isValid(undefined) ? "SI" : "No"}</div>
}
export default HomeView
