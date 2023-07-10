import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Loaders from "@/components/Loaders";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { getHistories } from "@/utils/https/history";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CardHistory from "@/components/Pages/CardHistory";

function History() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setLoading] = useState(true);
  const [metaPage, setMetaPage] = useState(1);
  const [metaLimit, setMetaLimit] = useState(8);
  const [totalPage, setTotalPage] = useState("");
  const [filter, setFilter] = useState("");
  const [dataHistory, setDataHistory] = useState([]);
  const fetching = async () => {
    setLoading(true);
    router.replace({
      pathname: "/history",
      query: {
        page: metaPage,
        limit: metaLimit,
        filter,
      },
    });
    const params = { page: metaPage, limit: metaLimit, filter };
    try {
      const result = await getHistories(token, params, controller);
      // console.log(result.data);
      if (result.status && result.status === 200) {
        setDataHistory(result.data.data);
        setTotalPage(result.data.pagination.totalPage);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (info) => {
    if (info === "next") return setMetaPage(metaPage + 1);
    if (info === "prev") return setMetaPage(metaPage - 1);
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, metaPage]);

  return (
    <Layout title="History">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="dashboard" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow px-5 md:px-8 py-7">
            {isLoading ? (
              <Loaders />
            ) : (
              <div className="w-full flex flex-col h-full">
                <div className="w-full flex justify-between">
                  <h1 className="font-bold text-lg mb-5">
                    Transaction History
                  </h1>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-outline btn-info btn-sm m-1"
                    >
                      {filter !== "" ? `Filter by ${filter}` : "Select Filter"}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 font-bold"
                    >
                      <li
                        onClick={() => setFilter("")}
                        className={filter === "" && "text-grey"}
                      >
                        <a>{filter === "" ? "---" : "Reset"}</a>
                      </li>
                      <li
                        onClick={() => setFilter("WEEK")}
                        className={filter === "WEEK" && "text-grey"}
                      >
                        <a>Week</a>
                      </li>
                      <li
                        onClick={() => setFilter("MONTH")}
                        className={filter === "MONTH" && "text-grey"}
                      >
                        <a>Month</a>
                      </li>
                      <li
                        onClick={() => setFilter("YEAR")}
                        className={filter === "YEAR" && "text-grey"}
                      >
                        <a>Year</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <section className="w-full flex-col mt-1 overflow-y-auto md:max-h-[50vh] md:pr-4">
                  {dataHistory.map((data) => (
                    <CardHistory
                      key={data.id}
                      img={data.image}
                      firstName={data.firstName}
                      lastName={data.lastName}
                      fullName={data.fullName}
                      notes={data.notes}
                      type={data.type}
                      amount={data.amount}
                      times={data.createdAt}
                    />
                  ))}
                </section>

                <div className="btn-group mt-auto mx-auto">
                  <button
                    onClick={() => handlePagination("prev")}
                    disabled={metaPage === 1}
                    className="btn btn-info btn-outline btn-sm"
                  >
                    Prev
                  </button>
                  <button className="btn btn-info btn-outline btn-sm font-bold">
                    Page {metaPage} / {totalPage}
                  </button>
                  <button
                    onClick={() => handlePagination("next")}
                    disabled={metaPage === totalPage}
                    className="btn btn-info btn-outline btn-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default History;
