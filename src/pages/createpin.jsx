import Layout from "@/components/Layout";
import AuthSide from "@/components/AuthSide";
import { useMemo, useState } from "react";
import PinField from "react-pin-field";
import { useSelector } from "react-redux";
import { changePin } from "@/utils/https/auth";
import { useRouter } from "next/router";
import PrivateRoute from "@/utils/wrapper/privateRoute";

function SuccessPin() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <span className="w-20 h-20 flex justify-center items-center rounded-full bg-green-500">
        <i className="bi bi-check-lg text-white text-5xl"></i>
      </span>
      <h2 className="text-2xl font-bold my-12">
        Your PIN Was Successfully Created
      </h2>
      <p className="text-grey mb-20">
        Your PIN was successfully created and you can now access all the
        features in FazzPay.
      </p>
      <button onClick={() => router.push("/dashboard")} className="btn-prime">
        Go To Dashboard
      </button>
    </div>
  );
}

function Createpin() {
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.data.id);

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [pin, setPin] = useState("");

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await changePin(userId, token, pin, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setInvalid(true);
        setLoading(false);
      }
    }
  };

  const handlePinChange = (value) => {
    setPin(value);
    setInvalid(false);
  };
  // console.log(pin);
  return (
    <Layout title="Create PIN">
      <div className="w-full flex flex-col md:flex-row">
        <AuthSide />
        <section className="flex-1 w-full mb-14 md:mb-0">
          <div className="flex flex-col px-4 md:px-0 md:pl-10 md:pr-10% py-5 md:py-20 w-full max-w-[720px]">
            {isSuccess ? (
              <SuccessPin />
            ) : (
              <>
                <h2 className="text-lg md:text-2xl font-bold md:leading-9 mb-4 md:mb-10">
                  Secure Your Account, Your Wallet, and Your Data With 6 Digits
                  PIN That You Created Yourself.
                </h2>
                <p className="text-sm md:text-lg font-semibold text-[#3a3d4270]">
                  Create 6 digits pin to secure all your money and your data in
                  FazzPay app. Keep it secret and don’t tell anyone about your
                  FazzPay account password and the PIN.
                </p>
                <form action="" className="flex flex-col w-full text-xl">
                  <div className="input-pin flex justify-between my-10 px-4">
                    <PinField
                      length={6}
                      onChange={handlePinChange}
                      type="password"
                      pattern="\d"
                      inputMode="numeric"
                      autoSelect={true}
                    />
                  </div>
                  <p className="w-full text-center h-5 mb-8 text-secondary font-semibold">
                    {isInvalid && "Pin must be in numeric format.!"}
                  </p>
                  {isLoading ? (
                    <button className="btn loading bg-prime text-white border-none">
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleConfirm}
                      disabled={isInvalid || pin === ""}
                      className="btn-prime"
                    >
                      Confirm
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default PrivateRoute(Createpin);
