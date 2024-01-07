import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  window.location.href = "/";
};

const tokenPresent = () => {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/dashboard";
  }
};

export const navData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
    onClick: () => tokenPresent(),
  },
  {
    id: 1,
    icon: <GridViewIcon />,
    text: "Dahsboard",
    link: "/dashboard",
  },
  {
    id: 2,
    icon: <FileUploadIcon />,
    text: "Upload Lottie",
    link: "/upload-lottie",
  },
  {
    id: 3,
    icon: <AccountCircleIcon />,
    text: "Profile",
    link: "/profile",
  },
  {
    id: 4,
    icon: <LogoutIcon />,
    text: "Log out",
    onClick: () => logOut(),
  },
];

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  console.log("token:", token);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div data-comp={open ? "sideNav" : "sideNav closed"}>
      <button data-comp="menuBtn" onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      {navData.map((item) =>
        token ? (
          <NavLink
            key={item.id}
            data-comp="sideItem"
            to={item.link}
            onClick={item.onClick}
          >
            {item.icon}
            <span data-comp={open ? "linkText" : "linkText closed"}>
              {item.text}
            </span>
          </NavLink>
        ) : null
      )}
    </div>
  );
}
