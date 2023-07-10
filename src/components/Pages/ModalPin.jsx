import { useMemo } from "react";
import ChngeCheckPin from "./ChngeCheckPin";
import { useSelector } from "react-redux";
import { postTransfer } from "@/utils/https/transaction";

function ModalPin({ isOpen, onClose, data }) {
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.user);
  const dataAuth = {
    token: userState.token,
    userId: userState.data.id,
    controller,
  };
  const handleSuccess = async () => {
    const form = {
      receiverId: data.dataReceiver.id,
      amount: data.amount,
      notes: data.notes,
    };
    console.log(form);
    try {
      const result = await postTransfer(dataAuth.token, form, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        onClose("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);
  return (
    <>
      {isOpen && (
        <section className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-slate-900/90 z-50">
          <div className="w-[90%] md:w-2/6 p-5 md:p-10 flex flex-col bg-white rounded-2xl">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-bold text-2xl">Enter PIN to Transfer</h1>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-circle border-2 border-secondary text-secondary bg-white hover:bg-secondary hover:border-secondary hover:text-white"
              >
                <i className="bi bi-x text-4xl"></i>
              </button>
            </div>
            <p className="md:w-72">
              Enter your 6 digits PIN for confirmation to continue transferring
              money.{" "}
            </p>
            <ChngeCheckPin
              dataAuth={dataAuth}
              isShow={true}
              onClose={handleSuccess}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default ModalPin;
