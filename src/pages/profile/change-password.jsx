import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import { editPassword } from "@/utils/https/user";
import { useSelector } from "react-redux";

function ChangePassword() {
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.user);
  const userId = userState.data.id;
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [showOldPass, setShowOld] = useState(false);
  const [showNewPass, setShowNew] = useState(false);
  const [showConfirmPass, setShowConfirm] = useState(false);
  const [oldPassword, setOldPass] = useState("");
  const [newPassword, setNewPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const handleConfirmChange = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setInvalid(true);
      setMsgFetch("Your new password does not match.!");
      return;
    }
    setLoading(true);
    const token = userState.token;
    const body = { oldPassword, newPassword, confirmPassword };
    // console.log(body);
    try {
      const result = await editPassword(token, userId, body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setMsgFetch("Your password has been successfully changed");
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 400) {
        setInvalid(true);
        setMsgFetch(error.response.data.msg);
        setLoading(false);
      }
    }
  };
  return (
    <Layout title="Change Password">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="profile" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow py-10">
            <div className="w-full md:max-w-[400px] px-5 mr-auto">
              <h1 className="font-bold text-lg mb-5">Change Password</h1>
              <p className="text-grey mb-6">
                You must enter your current password and then type your new
                password twice.
              </p>
            </div>
            <form
              action=""
              className="flex flex-col w-full max-w-[430px] px-5 md:px-0 text-xl"
            >
              <label
                htmlFor="newPassword"
                className={`label-input ${
                  isInvalid && "border-secondary"
                } mt-7 md:mt-10`}
              >
                {showOldPass ? (
                  <i
                    onClick={() => setShowOld(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowOld(true)}
                    className="bi bi-eye-slash text-grey hover:text-prime cursor-pointer"
                  ></i>
                )}
                <input
                  type={showOldPass ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(event) => {
                    setInvalid(false);
                    setSuccess(false);
                    setOldPass(event.target.value);
                  }}
                  placeholder="Current password"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-lock ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>

              <label
                htmlFor="newPassword"
                className={`label-input ${
                  isInvalid && "border-secondary"
                } mt-7 md:mt-10`}
              >
                {showNewPass ? (
                  <i
                    onClick={() => setShowNew(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowNew(true)}
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
                    setSuccess(false);
                    setNewPass(event.target.value);
                  }}
                  placeholder="New password"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-lock ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>
              <label
                htmlFor="confirmPassword"
                className={`label-input ${
                  isInvalid && "border-secondary"
                } mt-7 md:mt-10`}
              >
                {showConfirmPass ? (
                  <i
                    onClick={() => setShowConfirm(false)}
                    className="bi bi-eye text-grey hover:text-prime cursor-pointer ml-auto"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowConfirm(true)}
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
                    setSuccess(false);
                    setConfirmPass(event.target.value);
                  }}
                  placeholder="Reapet new password"
                  className="w-full"
                />
                <i
                  className={`icon-input bi bi-lock ${
                    isInvalid ? "text-secondary" : "text-grey"
                  }`}
                ></i>
              </label>

              <p
                className={`w-full text-center h-5 my-5 ${
                  isSuccess ? "text-green-500" : "text-secondary"
                } font-semibold`}
              >
                {(isSuccess && msgFetch) || (isInvalid && msgFetch)}
              </p>
              {isLoading ? (
                <button className="btn loading bg-prime border-none text-white">
                  Loading...
                </button>
              ) : isSuccess ? (
                <Link href={`/profile/${userId}`} className="btn-prime">
                  Go Back
                </Link>
              ) : (
                <button
                  onClick={handleConfirmChange}
                  disabled={
                    isInvalid ||
                    oldPassword === "" ||
                    newPassword === "" ||
                    confirmPassword === ""
                  }
                  className="btn-prime"
                >
                  Reset Password
                </button>
              )}
            </form>
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(ChangePassword);
