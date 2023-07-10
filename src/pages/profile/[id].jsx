import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import Logout from "@/components/Logout";
import { editImage, getProfile } from "@/utils/https/user";
import { userAction } from "@/redux/slices/auth";

function Profile() {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const dataUser = userStore.data;
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [imgValue, setImgVal] = useState("");
  const [displayImg, setDisplayImg] = useState("");

  const onChangeImg = (event) => {
    setImgVal(event.target.files[0]);
    setDisplayImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpdateImage = async () => {
    setLoading(true);
    const token = userStore.token;
    const userId = userStore.data.id;
    try {
      const result = await editImage(token, userId, imgValue, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        const getData = await getProfile(token, userId, controller);
        dispatch(userAction.getDataProfile(getData.data.data));
        setDisplayImg("");
        setImgVal("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userStore);
  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    dataUser.image;
  return (
    <Layout title="Profile">
      <Header />
      <Logout
        logoutOpen={showLogout}
        logoutClose={() => setShowLogout(false)}
      />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="profile" />

          <div className="flex-1 flex flex-col justify-center items-center gap-4 rounded-3xl bg-white shadow py-10">
            <span className="w-full flex flex-col items-center">
              <div className="avatar">
                <div className="w-20 mask mask-squircle">
                  <Image
                    src={
                      imgValue
                        ? displayImg
                        : dataUser.image
                        ? imgUrl
                        : "/images/users.webp"
                    }
                    alt="display-user"
                    width="50"
                    height="50"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex w-4/5 md:w-1/3 justify-center items-center gap-4 mt-3 mb-6">
                {imgValue !== "" ? (
                  isLoading ? (
                    <button className="btn btn-sm loading bg-prime border-prime text-white px-5">
                      Loading
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setImgVal("");
                          setDisplayImg("");
                        }}
                        className="flex-1 btn btn-outline btn-info btn-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateImage}
                        className="flex-1 btn btn-info btn-sm"
                      >
                        Save Change
                      </button>
                    </>
                  )
                ) : (
                  <label htmlFor="inputImage" className="cursor-pointer">
                    <i className="bi bi-pencil mr-4"></i>
                    Edit
                    <input
                      type="file"
                      name="image"
                      id="inputImage"
                      onChange={onChangeImg}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="text-xl font-bold">{`${dataUser.firstName} ${dataUser.lastName}`}</h2>
              <p className="mt-4 mb-8">{dataUser.phone}</p>
            </span>
            <div className="w-full px-5 md:px-0 md:w-3/5 flex flex-col gap-4">
              <Link
                href={"/profile/personal-info"}
                className="btn btn-ghost bg-slate-400/20 capitalize font-bold flex justify-between"
              >
                Personal Information
                <i className="bi bi-arrow-right text-xl"></i>
              </Link>
              <Link
                href={"/profile/change-password"}
                className="btn btn-ghost bg-slate-400/20 capitalize font-bold flex justify-between"
              >
                Change Password
                <i className="bi bi-arrow-right text-xl"></i>
              </Link>
              <Link
                href={"/profile/change-pin"}
                className="btn btn-ghost bg-slate-400/20 capitalize font-bold flex justify-between"
              >
                Change PIN
                <i className="bi bi-arrow-right text-xl"></i>
              </Link>
              <button
                onClick={() => setShowLogout(true)}
                className="btn btn-ghost bg-slate-400/20 capitalize font-bold flex justify-between"
              >
                Logout
                <i className="bi bi-box-arrow-right text-xl"></i>
              </button>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(Profile);
