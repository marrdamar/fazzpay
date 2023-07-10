import { userAction } from "@/redux/slices/auth";
import { logout } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Logout({ logoutOpen, logoutClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout(token, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        router.push("/");
        dispatch(userAction.logoutRedux());
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickChild = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      {logoutOpen && (
        <section
          onClick={logoutClose}
          className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-slate-900/90 z-50"
        >
          <div
            onClick={handleClickChild}
            className="w-4/5 md:w-[560px] p-5 md:p-10 flex flex-col bg-white rounded-2xl"
          >
            <button
              type="button"
              onClick={logoutClose}
              className="btn btn-circle border-2 border-secondary text-secondary bg-white hover:bg-secondary hover:border-secondary hover:text-white ml-auto"
            >
              <i className="bi bi-x text-4xl"></i>
            </button>
            <p className="text-2xl font-bold my-10">
              Are you sure want to logout ?
            </p>
            <div className="w-full flex">
              {isLoading ? (
                <button className="flex-1 btn loading bg-prime text-white border-prime">
                  Loading
                </button>
              ) : (
                <button onClick={handleLogout} className="flex-1 btn-prime">
                  Confirm
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Logout;
