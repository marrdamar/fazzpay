import { PinField } from "react-pin-field";
import { useState } from "react";
import Link from "next/link";
import { changePin } from "@/utils/https/auth";
import { useDispatch } from "react-redux";
import { userAction } from "@/redux/slices/auth";

function ChngeEditPin({ dataAuth, isShow, onClose }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [pin, setPin] = useState("");

  const onChangePin = (value) => {
    setPin(value);
    setInvalid(false);
  };

  const handleChangePin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await changePin(
        dataAuth.userId,
        dataAuth.token,
        pin,
        dataAuth.controller
      );
      console.log(result);
      if (result.status && result.status === 200) {
        dispatch(userAction.createPinRedux(dataAuth.userId));
        setLoading(false);
        setMsgFetch("Your pin has been successfully changed");
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 400) {
        setLoading(false);
        setMsgFetch(error.response.data.msg);
        setInvalid(true);
      }
    }
  };
  return (
    <>
      {isShow && (
        <form action="" className="w-full md:w-3/5 px-5 md:px-0">
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
              <Link
                href={`/profile/${dataAuth.userId}`}
                className="flex-1 btn-outline-prime"
              >
                Go Back
              </Link>
            ) : (
              <button
                onClick={handleChangePin}
                disabled={isInvalid || pin < 6}
                className="flex-1 btn-prime"
              >
                Change PIN
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default ChngeEditPin;
