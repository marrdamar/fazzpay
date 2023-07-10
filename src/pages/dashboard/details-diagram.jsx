import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import DashbDiagram from "@/components/Pages/DashbDiagram";

function ChangePin() {
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;

  return (
    <Layout title="Details Income $ Expense">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="dashboard" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow py-6 px-3 md:px-16">
            <DashbDiagram
              userId={userId}
              token={token}
              controller={controller}
            />
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(ChangePin);
