import AuthSide from "@/components/AuthSide";
import Layout from "@/components/Layout";
import { register } from "@/utils/https/auth";
import PublicRoute from "@/utils/wrapper/publicRoute";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

function SignUp() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onChangeForm = (event) => {
    setSuccess(false);
    if (event.target.name === "email") setInvalid(false);
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(form);
    try {
      const result = await register(form, controller);
      // console.log(result);
      if (result.status === 200) {
        setMsgFetch("Registration successful, please check your email.");
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.msg);
        setMsgFetch(error.response.data.msg);
        setInvalid(true);
        setLoading(false);
      }
    }
  };
  const handleNavigate = (to) => {
    router.push(to);
  };
  return (
    <Layout title="Sign Up">
      <div className="w-full flex flex-col md:flex-row">
        <AuthSide />
        <section className="flex-1 w-full mb-14 md:mb-0">
          <div className="flex flex-col px-4 md:px-0 md:pl-10 md:pr-10% py-5 md:py-20 w-full max-w-[720px]">
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
              <label htmlFor="firstName" className="label-input mt-7 md:mt-14">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChangeForm}
                  placeholder="Enter your first name"
                  className="w-full"
                />
                <i className="icon-input bi bi-person text-grey"></i>
              </label>
              <label htmlFor="lastName" className="label-input mt-7 md:mt-14">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChangeForm}
                  placeholder="Enter your last name"
                  className="w-full"
                />
                <i className="icon-input bi bi-person text-grey"></i>
              </label>
              <label htmlFor="email" className="label-input mt-7 md:mt-14">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChangeForm}
                  placeholder="Enter your e-mail"
                  className="w-full"
                />
                <i className="icon-input bi bi-envelope text-grey"></i>
              </label>
              <label htmlFor="password" className="label-input mt-7 md:mt-14">
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
                <i className="icon-input bi bi-lock text-grey"></i>
              </label>
              <p
                className={`w-full text-center h-5 my-5 font-semibold ${
                  isSuccess ? "text-green-500" : "text-secondary"
                }`}
              >
                {isInvalid || (isSuccess && msgFetch)}
              </p>
              {isLoading ? (
                <button className="btn loading bg-prime border-none text-white my-10">
                  Loading...
                </button>
              ) : isSuccess ? (
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="btn-prime my-10"
                >
                  Go Login
                </button>
              ) : (
                <button
                  onClick={handleSignup}
                  disabled={
                    isInvalid ||
                    form.email === "" ||
                    form.password === "" ||
                    form.firstName === "" ||
                    form.lastName === ""
                  }
                  className="btn-prime my-10"
                >
                  Sign Up
                </button>
              )}
            </form>
            <p className="text-center">
              Already have an account? Let’s{" "}
              <span
                onClick={() => handleNavigate("/login")}
                className="text-prime font-bold cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PublicRoute(SignUp);
