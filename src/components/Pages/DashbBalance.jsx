import { useEffect, useState } from "react";
import Loaders from "../Loaders";
import { getProfile } from "@/utils/https/user";
import { useDispatch } from "react-redux";
import { userAction } from "@/redux/slices/auth";

function DashbBalance({ userId, token, controller }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [dataBalance, setDataBalance] = useState({});
  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProfile(token, userId, controller);
      // console.log(result.data.data);
      setDataBalance(result.data.data);
      dispatch(userAction.editBalanceRedux(result.data.data.balance));
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
      {" "}
      {isLoading ? (
        <Loaders />
      ) : (
        <div className="text-white flex flex-col justify-between mr-auto">
          <p className="text-sm md:text-base">Balance</p>
          <h3 className="font-bold text-4xl">
            Rp. {dataBalance.balance.toLocaleString("id-ID")}
          </h3>
          <p className="text-base mb-4 md:mb-0">{dataBalance.noTelp}</p>
        </div>
      )}
    </>
  );
}

export default DashbBalance;
