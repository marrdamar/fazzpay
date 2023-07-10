import Image from "next/image";
import Link from "next/link";
import React from "react";

function TransferStatus({ isOpen, isSuccess, data }) {
  return (
    <>
      {isOpen && (
        <section className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-slate-900/90 z-50">
          <div className="w-[90%] md:w-2/6 md:max-w-md p-5 md:p-10 flex flex-col bg-white rounded-2xl justify-center items-center">
            <span
              className={`w-10 h-10 md:w-16 md:h-16 flex justify-center items-center ${
                isSuccess ? "bg-green-500" : "bg-secondary"
              } text-white rounded-full text-4xl`}
            >
              {isSuccess ? (
                <i className="bi bi-check-lg"></i>
              ) : (
                <i className="bi bi-x"></i>
              )}
            </span>
            <p className="font-bold text-lg mt-2 md:mt-4 mb-4 md:mb-8">
              Transfer
              {isSuccess ? " Success" : " Failed"}
            </p>

            {!isSuccess && (
              <p className="text-grey text-center text-sm md:text-base mb-4 md:mb-8">
                We can’t transfer your money at the moment, we recommend you to
                check your internet connection and try again.
              </p>
            )}

            <p className="font-bold text-sm md:text-base mr-auto mb-4">
              Transfer To :
            </p>
            <div className="overflow-x-auto border rounded-2xl shadow-xl">
              <span className="flex w-full justify-center border-b py-4">
                <div className="avatar">
                  <div className="w-16 mask mask-squircle">
                    <Image
                      src={data.dataReceiver.img}
                      alt="display-profile"
                      width={50}
                      height={50}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 pl-5">
                  <h1 className="md:text-lg font-bold">
                    {data.dataReceiver.userName}
                  </h1>
                  <p className="text-grey text-sm md:text-base">
                    {data.dataReceiver.phone}
                  </p>
                </div>
              </span>

              <table className="table w-full text-sm md:text-base">
                <tbody>
                  <tr>
                    <td>Amount</td>
                    <td>:</td>
                    <td>{data.amount}</td>
                  </tr>
                  <tr>
                    <td>Balance Left</td>
                    <td>:</td>
                    <td>{data.balanceLeft}</td>
                  </tr>
                  <tr>
                    <td>Date & Time</td>
                    <td>:</td>
                    <td>{data.date}</td>
                  </tr>
                  <tr>
                    <td>Notes</td>
                    <td>:</td>
                    <td>{data.notes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full flex gap-5 mt-8">
              <button className="flex-1 btn-outline-prime">Download PDF</button>
              <Link href={"/dashboard"} className="flex-1 btn-prime">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default TransferStatus;
