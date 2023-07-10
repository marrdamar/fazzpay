import Loaders from "@/components/Loaders";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PublicRoute(WrappedComponent) {
  const Auth = (props) => {
    const isToken = useSelector((state) => state.user.token);
    const router = useRouter();

    if (isToken) {
      router.push("/dashboard");
      // return (
      //   <div className="w-screen h-screen flex justify-center items-center">
      //     <Loaders />;
      //   </div>
      // );
    }

    if (!isToken) {
      return <WrappedComponent {...props} />;
    }
  };
  return Auth;
}

export default PublicRoute;
