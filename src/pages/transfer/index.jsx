import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavSide from "@/components/NavSide";
import Footer from "@/components/Footer";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import CardReceiver from "@/components/Pages/CardReceiver";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "@/utils/https/transaction";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import Loaders from "@/components/Loaders";

function Transfer() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [dataUsers, setDataUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchPar, setSearchPar] = useState("");
  const [metaPage, setMetaPage] = useState(1);
  const [metaLimit, setMetaLimit] = useState(4);
  const [metaSort, setMetaSort] = useState("");
  const [totalPage, setTotalPage] = useState();

  const fetching = async () => {
    setLoading(true);
    router.replace({
      pathname: "/transfer",
      query: {
        limit: metaLimit,
        page: metaPage,
        sort: metaSort,
        search: searchPar,
      },
    });
    const params = {
      page: metaPage,
      limit: metaLimit,
      sort: metaSort,
      search: searchPar,
    };
    try {
      const result = await getUsers(token, params, controller);
      // console.log(result);
      setDataUser(result.data.data);
      setTotalPage(result.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(router.query);
    // setMetaPage(router.query.page || metaPage);
    // setMetaLimit(router.query.limit || metaLimit);
    // setSearchPar(router.query.search || searchPar);
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaPage, searchPar, metaSort]);

  const onSearching = debounce((event) => {
    setMetaPage(1);
    setSearchPar(event.target.value);
  }, 700);

  const handlePagination = (info) => {
    if (info === "next") return setMetaPage(metaPage + 1);
    if (info === "prev") return setMetaPage(metaPage - 1);
  };

  return (
    <Layout title="Transfer">
      <Header />
      <section className="w-full md:min-h-[72vh] bg-slate-500/10 flex justify-center py-5 md:py-0">
        <main className="w-full max-w-notebook flex gap-7 px-4 md:px-10% md:py-7">
          <NavSide titlePage="transfer" />

          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white shadow px-5 py-6">
            <div className="w-full flex">
              <h1 className="font-bold text-lg mb-5 mr-auto">
                Search Receiver
              </h1>
              <div className="dropdown dropdown-end max-w-[46%]">
                <label
                  tabIndex={0}
                  className="btn btn-sm btn-info btn-outline m-1"
                >
                  Sort by :{" "}
                  {metaSort === "firstName ASC"
                    ? "Name A-Z"
                    : metaSort === "firstName DESC"
                    ? "Name Z-A"
                    : metaSort}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={() => setMetaSort("")}
                    disabled={metaSort === ""}
                    className={`font-bold ${metaSort === "" && "text-grey"}`}
                  >
                    <a>{metaSort === "" ? "---" : "Reset"}</a>
                  </li>
                  <li
                    onClick={() => setMetaSort("firstName ASC")}
                    className={`font-bold ${
                      metaSort === "firstName ASC" && "text-grey"
                    }`}
                  >
                    <a>Name A-Z</a>
                  </li>
                  <li
                    onClick={() => setMetaSort("firstName DESC")}
                    className={`font-bold ${
                      metaSort === "firstName DESC" && "text-grey"
                    }`}
                  >
                    <a>Name Z-A</a>
                  </li>
                  <li
                    onClick={() => setMetaSort("noTelp ASC")}
                    className={`font-bold ${
                      metaSort === "noTelp ASC" && "text-grey"
                    }`}
                  >
                    <a>Phone 0-9</a>
                  </li>
                  <li
                    onClick={() => setMetaSort("noTelp DESC")}
                    className={`font-bold ${
                      metaSort === "noTelp DESC" && "text-grey"
                    }`}
                  >
                    <a>Phone 9-0</a>
                  </li>
                </ul>
              </div>
            </div>
            <span className="w-full rounded-lg bg-slate-400/20 px-4 py-3 text-lg">
              <label htmlFor="search" className="flex">
                <i class="bi bi-search mr-4"></i>
                <input
                  type="text"
                  id="search"
                  name="search"
                  onChange={onSearching}
                  className="bg-transparent w-full focus:outline-none"
                />
              </label>
            </span>
            <div className="w-full flex flex-col gap-5 md:px-5 py-5">
              {isLoading ? (
                <div className="w-full h-full flex justify-center items-center py-10">
                  <Loaders />
                </div>
              ) : dataUsers.length < 1 ? (
                <p className="text-center text-2xl font-bold my-10">
                  Data Not Found
                </p>
              ) : (
                dataUsers.map((user, idx) => (
                  <CardReceiver
                    key={idx}
                    userId={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    img={user.image}
                    tlp={user.noTelp}
                  />
                ))
              )}
            </div>
            <div className="btn-group mt-auto">
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
        </main>
      </section>
      <Footer />
    </Layout>
  );
}

export default PrivateRoute(Transfer);
