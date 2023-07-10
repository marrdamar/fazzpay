import { useRouter } from "next/router";
import TopUp from "./TopUp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import { contentAction } from "@/redux/slices/content";

function NavSide(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user.data);
  const isToggle = useSelector((state) => state.content.toggleMenu);
  const [openTopup, setOpenTopup] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const handleToggleClose = () => {
    dispatch(contentAction.resetToggle());
  };

  // console.log(userStore.id);
  return (
    <>
      <TopUp isOpen={openTopup} onClose={() => setOpenTopup(false)} />
      <Logout
        logoutOpen={openLogout}
        logoutClose={() => {
          handleToggleClose;
          setOpenLogout(false);
        }}
      />
      <ul
        className={`navside-content fixed ${
          isToggle ? "top-[6.5rem]" : "top-[-100%]"
        } right-4 md:static flex z-30`}
      >
        <li
          onClick={() => {
            handleToggleClose();
            router.push("/dashboard");
          }}
          className={`nav-side ${
            props.titlePage === "dashboard" && "navside-active"
          }`}
        >
          <i className="bi bi-grid"></i> Dashboard
        </li>
        <li
          onClick={() => {
            handleToggleClose();
            router.push("/transfer");
          }}
          className={`nav-side ${
            props.titlePage === "transfer" && "navside-active"
          }`}
        >
          <i className="bi bi-arrow-up"></i> Transfer
        </li>
        <li
          onClick={() => {
            handleToggleClose();
            setOpenTopup(!openTopup);
          }}
          className={`nav-side ${
            props.titlePage === "topup" && "navside-active"
          }`}
        >
          <i className="bi bi-plus-lg"></i> Top Up
        </li>
        <li
          onClick={() => {
            handleToggleClose();
            router.push(`/profile/${userStore.id}`);
          }}
          className={`nav-side ${
            props.titlePage === "profile" && "navside-active"
          }`}
        >
          <i className="bi bi-person"></i> Profile
        </li>
        <li
          onClick={() => {
            handleToggleClose();
            setOpenLogout(true);
          }}
          className="nav-side mt-20 md:mt-auto"
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </li>
      </ul>
      <div
        onClick={handleToggleClose}
        className={`w-screen h-screen fixed ${
          isToggle ? "opacity-60 z-10" : "opacity-0 -z-10"
        } top-0 left-0 bg-black transition-opacity md:hidden`}
      ></div>
    </>
  );
}

export default NavSide;
