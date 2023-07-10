import AuthSide from "@/components/AuthSide";
import Layout from "@/components/Layout";
import { userAction } from "@/redux/slices/auth";
import { login } from "@/utils/https/auth";
import { getProfile } from "@/utils/https/user";
import PublicRoute from "@/utils/wrapper/publicRoute";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

function Login() {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [msgFetch, setMsgFetch] = useState("Server is Maintenance");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onChangeForm = (event) => {
    setInvalid(false);
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    // dispatch(userAction.loginThunk(form, controller))
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    // console.log(form);
    try {
      const resultLogin = await login(form, controller);
      // console.log(resultLogin);
      if (resultLogin.status === 200) {
        const resultProfile = await getProfile(
          resultLogin.data.data.token,
          resultLogin.data.data.id,
          controller
        );
        // console.log(resultProfile);
        dispatch(userAction.loginRedux(resultLogin.data.data));
        dispatch(userAction.getDataProfile(resultProfile.data.data));
        if (resultLogin.data.data.pin === null) handleNavigate("/createpin");
        else handleNavigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setMsgFetch("Email / Password Invalid");
        }
        if (error.response.status === 404) {
          setMsgFetch(error.response.data.msg);
        }
      }
      setInvalid(true);
      setLoading(false);
    }
  };
  const handleNavigate = (to) => {
    router.push(to);
  };
  return (
    <Layout title="Login">
      <div className="w-full flex flex-col md:flex-row">
        <AuthSide />
        <section className="flex-1 w-full mb-14 md:mb-0">
          <div className="flex flex-col justify-center items-center px-4 md:px-0 md:pl-10 md:pr-10% py-5 md:py-20 w-full max-w-[720px]">
            <h2 className="text-lg md:text-2xl font-bold md:leading-9 mb-4 md:mb-10">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h2>
            <p className="text-sm md:text-lg font-semibold text-[#3a3d4270]">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <form action="" className="flex flex-col w-full text-xl">
              <label
                htmlFor="email"
                className={`label-input ${
                  isInvalid && "border-secondary"
                } mt-7 md:mt-14`}
              >
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChangeForm}
                  placeholder="Enter your e-mail"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-envelope ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>
              <label
                htmlFor="password"
                className={`label-input ${
                  isInvalid && "border-secondary"
                } mt-7 md:mt-14`}
              >
                {" "}
                {showPass ? (
                  <i
                    onClick={() => setShowPass(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPass(true)}
                    className="bi bi-eye-slash text-grey hover:text-prime cursor-pointer"
                  ></i>
                )}
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={onChangeForm}
                  placeholder="Enter your password"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-lock ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>
              <Link
                href={"/resetpassword"}
                className="text-sm w-fit ml-auto mt-4 mb-7 md:mb-14 hover:text-prime"
              >
                Forgot Password?
              </Link>
              <p className="w-full text-center h-5 mb-8 text-secondary font-semibold">
                {isInvalid && msgFetch}
              </p>
              {isLoading ? (
                <button className="btn loading bg-prime border-none text-white mb-5 md:mb-10">
                  Loading...
                </button>
              ) : (
                // <button className="btn mb-5 md:mb-10" disabled>
                //   <progress className="progress progress-secondary w-full"></progress>
                // </button>
                <button
                  onClick={handleLogin}
                  disabled={
                    isInvalid || form.email === "" || form.password === ""
                  }
                  className="btn-prime mb-5 md:mb-10"
                >
                  Login
                </button>
              )}
            </form>
            <p className="text-center">
              Don’t have an account? Let’s{" "}
              <span
                onClick={() => handleNavigate("/signup")}
                className="text-prime font-bold cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PublicRoute(Login);
