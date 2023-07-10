import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "@/utils/https/user";
import { userAction } from "@/redux/slices/auth";

function EditPhone() {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [phoneValue, setPhoneVal] = useState(userState.data.phone);

  const onChangeInput = (event) => {
    setSuccess(false);
    const { value } = event.target;
    const regex = /^[0-9]+$/;
    if (regex.test(value) || value === "") {
      setPhoneVal(value);
    }
  };

  const handleUpdatePhone = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = userState.token;
    const userId = userState.data.id;
    const form = { noTelp: phoneValue };
    try {
      const result = await editProfile(token, userId, form, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        dispatch(userAction.editPhoneUser(phoneValue));
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Change Phone Number">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="profile" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow py-10">
            <div className="w-full md:max-w-[400px] px-5 mr-auto">
              <h1 className="font-bold text-lg mb-5">Edit Phone Number</h1>
              <p className="text-grey mb-6">
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </p>
            </div>
            <form action="" className="w-full md:w-3/5 px-5 md:px-0">
              <label
                htmlFor="phone"
                className="label-input mt-7 md:mt-14 font-bold text-xl px-2"
              >
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phoneValue}
                  onChange={onChangeInput}
                  placeholder="Enter your phone number"
                  className="w-full font-medium focus:outline-none"
                />
                {/* +62 */}
                <i className="icon-input bi bi-telephone text-grey"></i>
              </label>
              <p className="w-full text-xl font-semibold text-green-500 text-center h-10 mt-2 flex items-center justify-center">
                {isSuccess && "Your phone number has been successfully changed"}
              </p>
              {isLoading ? (
                <div className="w-full flex my-5 gap-10">
                  <button className="flex-1 btn loading bg-prime border-prime text-white">
                    Loading
                  </button>
                </div>
              ) : (
                <div className="w-full flex my-5 gap-10">
                  {userState.data.phone !== phoneValue ? (
                    <button
                      onClick={() => setPhoneVal(userState.data.phone)}
                      className="flex-1 btn-outline-prime"
                    >
                      Reset
                    </button>
                  ) : (
                    <Link
                      href={"/profile/personal-info"}
                      className="flex-1 btn-outline-prime"
                    >
                      {" "}
                      {isSuccess ? "Go Back" : "Cancel"}
                    </Link>
                  )}
                  {!isSuccess && (
                    <button
                      onClick={handleUpdatePhone}
                      disabled={
                        phoneValue === "" || phoneValue === userState.data.phone
                      }
                      className="flex-1 btn-prime"
                    >
                      Edit Phone Nomber
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(EditPhone);
