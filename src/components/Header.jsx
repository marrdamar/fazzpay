import { contentAction } from "@/redux/slices/content";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user.data);

  const handleToggle = () => {
    dispatch(contentAction.handleToggel());
  };

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    userStore.image;
  const defaultImg =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/Fazzpay/example_qx2pf0.png";
  return (
    <div className="w-full bg-slate-500/10 relative z-40">
      <header className="w-full flex justify-center bg-white rounded-b-3xl shadow">
        <nav className="w-full max-w-notebook md:min-h-[16vh] p-4 md:px-10% md:py-0 flex items-center flex-col md:flex-row">
          <div className="mr-auto flex w-full md:w-fit items-center">
            <h1 className="text-prime font-extrabold text-2xl mr-auto">
              FazzPay
            </h1>
            <button
              onClick={handleToggle}
              className="btn btn-square btn-sm btn-outline md:hidden"
            >
              <i className="bi bi-list text-2xl"></i>
            </button>
          </div>
          <span className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-7 md:w-14 mask mask-squircle">
                <Image
                  src={userStore.image ? imgUrl : "/images/users.webp"}
                  alt="display-profile"
                  width="50"
                  height="50"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold md:text-lg">{`${userStore.firstName} ${userStore.lastName}`}</h2>
              <p className="text-sm hidden md:block">
                {userStore.phone || "-"}
              </p>
            </div>
            <i className="bi bi-bell md:text-3xl"></i>
          </span>
        </nav>
      </header>
    </div>
  );
}

export default Header;
