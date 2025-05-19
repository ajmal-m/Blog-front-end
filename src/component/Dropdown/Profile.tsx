
import { Avatar, Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { logOutUser } from "../../store/userSlice";
import { useNavigate, NavLink } from "react-router";

export function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {name, email, avatar} = useSelector((state: RootStore) => state.user);
    const handleLogout = () => {
        dispatch(logOutUser());
        navigate('/auth/login');
    }
    console.log(name, avatar)
  return (
    <Dropdown
      label={<Avatar className="cursor-pointer" alt="User settings" img={avatar ?? "" } rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-[12px] text-white">{name}</span>
        <span className="block truncate text-sm font-medium text-white mt-1">{email}</span>
      </DropdownHeader>
      <DropdownItem>
        <NavLink to={'/user'}>
          Edit Profile
        </NavLink>
      </DropdownItem>
      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
    </Dropdown>
  );
}
