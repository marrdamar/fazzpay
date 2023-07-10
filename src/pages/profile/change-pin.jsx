import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import ChngeCheckPin from "@/components/Pages/ChngeCheckPin";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ChngeEditPin from "@/components/Pages/ChngeEditPin";

function ChangePin() {
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.user);
  const isPin = userState.data.pin;
  console.log(isPin);
  const dataAuth = {
    token: userState.token,
    userId: userState.data.id,
    controller,
  };
  const [showCheckPin, setShowCheck] = useState(true);
  const [showEditPin, setShowEdit] = useState(false);

  useEffect(() => {
    if (isPin === null) {
      setShowCheck(false);
      setShowEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout title="Change PIN">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="profile" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow py-10">
            <div className="w-full md:max-w-[400px] px-5 mr-auto">
              <div className="breadcrumbs font-bold text-lg">
                <ul>
                  <li className={showEditPin && "text-grey"}>
                    <a
                      onClick={() => {
                        setShowEdit(false);
                        setShowCheck(true);
                      }}
                    >
                      Check PIN
                    </a>
                  </li>
                  {showEditPin && <li>Update PIN</li>}
                </ul>
              </div>
              <p className="text-grey mb-6">
                {(showCheckPin &&
                  "Enter your current 6 digits Fazzpay PIN below to continue to the next steps.") ||
                  (showEditPin &&
                    "Type your new 6 digits security PIN to use in Fazzpay.")}
              </p>
            </div>
            <div className="w-full md:w-3/5">
              <ChngeCheckPin
                dataAuth={dataAuth}
                isShow={showCheckPin}
                onClose={() => {
                  setShowCheck(false);
                  setShowEdit(true);
                }}
              />
            </div>
            <ChngeEditPin
              dataAuth={dataAuth}
              isShow={showEditPin}
              onClose={() => {
                setShowEdit(false);
              }}
            />
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(ChangePin);
