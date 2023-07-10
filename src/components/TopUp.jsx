import { postTopup } from "@/utils/https/history";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

function TopUp({ isOpen, onClose }) {
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.user);
  const token = userState.token;
  const userPin = userState.data.pin;
  const userPhone = userState.data.phone;
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");
  const [canClose, setCanClose] = useState(false);
  const [linkPayment, setLinkPay] = useState("");
  const [valueTopup, setValueTopup] = useState("");

  const onChangeTopup = (event) => {
    setInvalid(false);
    const { value } = event.target;
    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      setValueTopup(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (valueTopup < 10000) {
      setInvalid(true);
      setMsgFetch("The minimum amount is Rp. 10.000,-");
      return;
    }
    setLoading(true);
    const form = { amount: valueTopup };
    try {
      const result = await postTopup(token, form, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        setLinkPay(result.data.data.redirectUrl);
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

  const handleNavigateLink = () => {
    window.open(linkPayment, "_blank");
    setCanClose(true);
  };

  return (
    <>
      {isOpen && (
        <section className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-slate-900/90 z-50">
          {isSuccess ? (
            <div className="w-4/5 md:w-[560px] p-5 md:p-10 flex flex-col bg-white rounded-2xl">
              <p className="text-3xl font-bold text-center my-14">
                Please Pay Top Up
              </p>
              {canClose ? (
                <button onClick={() => onClose()} className="btn-prime">
                  Close
                </button>
              ) : (
                <button onClick={handleNavigateLink} className="btn-prime">
                  Open link for pay
                </button>
              )}
            </div>
          ) : (
            <form className="w-4/5 md:w-[560px] p-5 md:p-10 flex flex-col bg-white rounded-2xl">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-bold text-2xl">Top Up</h1>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-circle border-2 border-secondary text-secondary bg-white hover:bg-secondary hover:border-secondary hover:text-white"
                >
                  <i className="bi bi-x text-4xl"></i>
                </button>
              </div>
              {isInvalid ? (
                <p className="text-secondary text-lg my-5">{msgFetch}</p>
              ) : (
                <p className="text-grey text-lg my-5">
                  Enter the amount of money, and click submit
                </p>
              )}
              <input
                type="text"
                name="topup"
                value={valueTopup}
                onChange={onChangeTopup}
                placeholder="Rp. 0,-"
                className="border-2 rounded-2xl px-4 text-center py-5 text-2xl font-bold focus:outline-prime"
              />
              <div className="w-full flex mt-10 gap-10">
                {isLoading ? (
                  <button className="flex-1 btn loading bg-prime text-white border-prime">
                    Loading
                  </button>
                ) : (
                  <>
                    <button
                      type="reset"
                      onClick={() => setValueTopup("")}
                      className="btn-outline-prime flex-1"
                    >
                      reset
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={
                        valueTopup === "" || valueTopup == 0 || isInvalid
                      }
                      className="btn-prime flex-1 ml-auto"
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </section>
      )}
    </>
  );
}

export default TopUp;
