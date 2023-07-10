import { useState } from "react";
import { useSelector } from "react-redux";
import ModalPin from "./ModalPin";
import TransferStatus from "./TransferStatus";

function TransferConfirm(props) {
  const balance = useSelector((state) => state.user.data.balance);
  const balanceLeft = balance - props.amount;

  const [isModalPin, setModalPin] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [msgFetch, setMsgFecth] = useState("OK");

  const handleTransferSuccess = (info) => {
    setModalPin(false);
    if (info === "success") setSuccess(true);
    if (info === "failed") setFailed(true);
  };

  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const formattedDate = `${date}/${month}/${year} - ${hours}.${minutes}`;
  const dataTransfer = {
    dataReceiver: props.dataReceiver,
    amount: props.amount,
    balanceLeft,
    date: formattedDate,
    notes: props.note,
  };
  // console.log(dataTransfer);

  return (
    <>
      {props.isShow && (
        <section className="w-full flex flex-col gap-4 mt-4">
          <h2 className="text-lg font-bold">Details</h2>
          <div className="w-full px-5 py-2 rounded-xl shadow-lg">
            <p className="text-md text-grey">Amount</p>
            <p className="font-bold">
              Rp. {props.amount.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="w-full px-5 py-2 rounded-xl shadow-lg">
            <p className="text-md text-grey">Balance Left</p>
            <p className="font-bold">
              Rp. {balanceLeft.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="w-full px-5 py-2 rounded-xl shadow-lg">
            <p className="text-md text-grey">Date & Time</p>
            <p className="font-bold">{formattedDate}</p>
          </div>
          <div className="w-full px-5 py-2 rounded-xl shadow-lg">
            <p className="text-md text-grey">Notes</p>
            <p className="font-bold">{props.note}</p>
          </div>
          <div className="w-full flex gap-10 mt-5 justify-center">
            <button
              onClick={props.backAmount}
              className="btn-outline-prime w-1/3"
            >
              Back
            </button>
            <button
              onClick={() => setModalPin(true)}
              className="btn-prime w-1/3"
            >
              Continue
            </button>
            <ModalPin
              isOpen={isModalPin}
              onClose={handleTransferSuccess}
              data={dataTransfer}
            />
            <TransferStatus
              isOpen={isSuccess || isFailed}
              isSuccess={isSuccess}
              data={dataTransfer}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default TransferConfirm;
