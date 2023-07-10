import { PinField } from "react-pin-field";
import { useState } from "react";
import Link from "next/link";
import { getPin } from "@/utils/https/auth";

function ChngeCheckPin({ dataAuth, isShow, onClose }) {
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msgFetch, setMsgFetch] = useState("halo");
  const [pin, setPin] = useState("");

  const onChangePin = (value) => {
    setPin(value);
    setInvalid(false);
  };

  const handleCheckPin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await getPin(dataAuth.token, pin, dataAuth.controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        setLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 400) {
        setMsgFetch(error.response.data.msg);
        setLoading(false);
        setInvalid(true);
      }
    }
  };
  return (
    <>
      {isShow && (
        <form action="" className="w-full px-5 md:px-0">
          <div className="input-pin flex justify-between my-10">
            <PinField
              length={6}
              onChange={onChangePin}
              type="password"
              pattern="\d"
              inputMode="numeric"
              autoSelect={true}
            />
          </div>

          <p
            className={`w-full text-center h-5 my-5 ${
              isSuccess ? "text-green-500" : "text-secondary"
            } font-semibold`}
          >
            {(isSuccess && msgFetch) || (isInvalid && msgFetch)}
          </p>

          <div className="w-full flex gap-10">
            {isLoading ? (
              <button className="flex-1 btn loading bg-prime border-prime text-white">
                Loading
              </button>
            ) : isSuccess ? (
              <Link href={`/profile`} className="flex-1 btn-outline-prime">
                Go Back
              </Link>
            ) : (
              <button
                onClick={handleCheckPin}
                disabled={isInvalid || pin.length < 6}
                className="flex-1 btn-prime"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default ChngeCheckPin;
