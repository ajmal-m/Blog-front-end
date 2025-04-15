import { Outlet } from "react-router"


export default function MainLayout() {
  return (
    <>
        <h1>Header</h1>
        <Outlet/>
        <h3>Footer</h3>
    </>
  )
}
