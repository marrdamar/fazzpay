import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import { editProfile } from "@/utils/https/user";
import { userAction } from "@/redux/slices/auth";

function PersonalInfo() {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCanSave, setCanSave] = useState(false);
  const dataUser = userStore.data;
  const [form, setForm] = useState({
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
  });
  const onChangeForm = (event) => {
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
    if (
      dataUser.firstName !== form.firstName ||
      dataUser.lastName !== form.lastName ||
      form.firstName !== "" ||
      form.lastName !== ""
    ) {
      setCanSave(true);
    }
  };
  const handleEditProfile = async () => {
    // console.log(form);
    setLoading(true);
    const token = userStore.token;
    const userId = userStore.data.id;
    try {
      const result = await editProfile(token, userId, form, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        dispatch(userAction.editNameUser(form));
        setLoading(false);
        setCanSave(false);
        handleShowSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setForm({
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
    });
    setCanSave(false);
  };
  const handleShowSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  return (
    <Layout title="Personal Info">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="profile" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow py-9">
            <div className="w-full md:max-w-[70%] px-5 mr-auto">
              <h1 className="font-bold text-lg mb-5">Personal Information</h1>
              <p className="text-grey">
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support. If you want to change the first name or last name, just
                click on the respective name column and make the changes.
              </p>
            </div>
            <span className="w-full flex flex-col p-5 gap-5">
              <div className="w-full flex flex-col rounded-xl shadow-md px-4 py-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChangeForm}
                  className="input-profile"
                  placeholder="Your first name"
                />
              </div>

              <div className="w-full flex flex-col rounded-xl shadow-md px-4 py-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChangeForm}
                  className="input-profile"
                  placeholder="Your last name"
                />
              </div>
              <div className="w-full flex flex-col rounded-xl shadow-md px-4 py-2">
                <label htmlFor="email">Verified E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={dataUser.email}
                  disabled={true}
                  className="input-profile text-grey"
                />
              </div>
              <div className="w-full flex flex-col rounded-xl shadow-md px-4 py-2">
                <label htmlFor="phone">Phone Number</label>
                <div className="w-full flex gap-4">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={dataUser.phone}
                    disabled={true}
                    className="input-profile w-full"
                  />
                  <Link
                    href={"/profile/edit-phone"}
                    className="text-prime hover:underline py-1 px-2 hover:bg-slate-400/30 rounded-lg"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </span>
            {isSuccess && (
              <p className="text-lg text-green-500 font-semibold mt-auto">
                Update Data Successfully
              </p>
            )}
            {isCanSave && (
              <div className="w-1/2 flex justify-center gap-10">
                {isLoading ? (
                  <button className="btn loading bg-prime border-prime text-white flex-1">
                    Loading
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="btn-outline-prime flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={
                        (dataUser.firstName === form.firstName &&
                          dataUser.lastName === form.lastName) ||
                        form.firstName === "" ||
                        form.lastName === ""
                      }
                      onClick={handleEditProfile}
                      className="btn-prime shadow-md flex-1"
                    >
                      Save Change
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(PersonalInfo);
