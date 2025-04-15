import { NavLink } from "react-router";

export default function SigIn() {
  return (
    <div>
        <h1>SignIn</h1>
        <NavLink to={'/login'}>
            Login
        </NavLink>
    </div>
  )
}
