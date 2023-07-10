import Layout from "@/components/Layout";
import AuthSide from "@/components/AuthSide";
import { useMemo, useState } from "react";
import { forgotPassword } from "@/utils/https/auth";
import PublicRoute from "@/utils/wrapper/publicRoute";

function ForgotPassword() {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [formEmail, setFormEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const body = {
        email: formEmail,
        // linkDirect: "http://localhost:3000/resetpassword",
        linkDirect: process.env.NEXT_PUBLIC_REDIRECT_RSTPWD,
      };
      const result = await forgotPassword(body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setMsgFetch(result.data.msg);
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMsgFetch(error.response.data.msg);
        setInvalid(true);
        setLoading(false);
      }
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="w-full flex flex-col md:flex-row">
        <AuthSide />
        <section className="flex-1 w-full mb-14 md:mb-0">
          <div className="flex flex-col px-4 md:px-0 md:pl-10 md:pr-10% py-5 md:py-20 w-full max-w-[720px]">
            <h2 className="text-lg md:text-2xl font-bold md:leading-9 mb-4 md:mb-10">
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </h2>
            <p className="text-sm md:text-lg font-semibold text-[#3a3d4270]">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
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
                  value={formEmail}
                  onChange={(event) => {
                    setInvalid(false);
                    setIsSuccess(false);
                    setFormEmail(event.target.value);
                  }}
                  placeholder="Enter your e-mail"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-envelope ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>

              <p className="w-full text-center h-5 my-5 text-secondary font-semibold">
                {isInvalid && msgFetch}
              </p>
              <p className="w-full text-center my-5 text-green-500 font-semibold text-lg">
                {isSuccess && msgFetch}
              </p>
              {isLoading ? (
                <button className="btn loading bg-prime border-none text-white my-10">
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isInvalid || formEmail === ""}
                  className="btn-prime my-10"
                >
                  Confirm
                </button>
              )}
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PublicRoute(ForgotPassword);
