import { useEffect, useState } from "react";
import Loaders from "../Loaders";
import { getDashboard } from "@/utils/https/user";
import BarChart from "./BarChart";

function DashbDiagram({ userId, token, controller }) {
  const [isLoading, setLoading] = useState(true);
  const [dataDiagram, setDataDiagram] = useState({});

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getDashboard(token, userId, controller);
      // console.log(result.data.data);
      setDataDiagram(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex">
            <span className="flex-1 flex flex-col">
              <i className="bi bi-arrow-down-short text-4xl text-green-500"></i>
              <p className="text-grey">Income</p>
              <p className="text-lg font-bold">
                Rp. {dataDiagram.totalIncome.toLocaleString("id-ID")}
              </p>
            </span>
            <span className="flex-1 flex flex-col items-end">
              <i className="bi bi-arrow-up-short text-4xl text-secondary"></i>
              <p className="text-grey">Expense</p>
              <p className="text-lg font-bold">
                Rp. {dataDiagram.totalExpense.toLocaleString("id-ID")}
              </p>
            </span>
          </div>
          <span className="w-full h-full justify-center items-center mt-5">
            <BarChart
              listExpense={dataDiagram.listExpense}
              listIncome={dataDiagram.listIncome}
            />
          </span>
        </div>
      )}
    </>
  );
}

export default DashbDiagram;
