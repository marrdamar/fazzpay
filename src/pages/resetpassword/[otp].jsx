import Layout from "@/components/Layout";
import AuthSide from "@/components/AuthSide";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { resetingPassword } from "@/utils/https/auth";
import Link from "next/link";
import PublicRoute from "@/utils/wrapper/publicRoute";

function ResetPassword() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setInvalid(true);
      setMsgFetch("Your password does not match.!");
      return;
    }
    setLoading(true);
    try {
      const body = {
        keysChangePassword: router.query.otp,
        newPassword,
        confirmPassword,
      };
      console.log(body);
      const result = await resetingPassword(body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMsgFetch(error.response.data.msg);
        setInvalid(true);
        setLoading(false);
        setError(true);
      }
    }
  };

  // console.log(router.query);

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
                htmlFor="newPassword"
                className="label-input mt-7 md:mt-14"
              >
                {" "}
                {showNewPass ? (
                  <i
                    onClick={() => setShowNewPass(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowNewPass(true)}
                    className="bi bi-eye-slash text-grey hover:text-prime cursor-pointer"
                  ></i>
                )}
                <input
                  type={showNewPass ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(event) => {
                    setInvalid(false);
                    setNewPassword(event.target.value);
                  }}
                  placeholder="Create new password"
                  className="w-full"
                />
                <i className="icon-input bi bi-lock text-grey"></i>
              </label>
              <label
                htmlFor="confirmPassword"
                className="label-input mt-7 md:mt-14"
              >
                {" "}
                {showConfirmPass ? (
                  <i
                    onClick={() => setShowConfirmPass(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowConfirmPass(true)}
                    className="bi bi-eye-slash text-grey hover:text-prime cursor-pointer"
                  ></i>
                )}
                <input
                  type={showConfirmPass ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => {
                    setInvalid(false);
                    setConfirmPass(event.target.value);
                  }}
                  placeholder="Confirm new password"
                  className="w-full"
                />
                <i className="icon-input bi bi-lock text-grey"></i>
              </label>

              <p className="w-full text-center h-5 my-5 text-secondary font-semibold">
                {isInvalid && msgFetch}
              </p>
              {isLoading ? (
                <button className="btn loading bg-prime border-none text-white my-10">
                  Loading...
                </button>
              ) : isError ? (
                <Link href={"/resetpassword"} className="btn-prime my-10">
                  Go Back
                </Link>
              ) : isSuccess ? (
                <Link href={"/login"} className="btn-prime my-10">
                  Go Login
                </Link>
              ) : (
                <button
                  onClick={handleResetPassword}
                  disabled={
                    isInvalid || newPassword === "" || confirmPassword === ""
                  }
                  className="btn-prime my-10"
                >
                  Reset Password
                </button>
              )}
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PublicRoute(ResetPassword);
