import Loaders from "@/components/Loaders";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PrivateRoute(WrappedComponent) {
  const Auth = (props) => {
    const isToken = useSelector((state) => state.user.token);
    const router = useRouter();

    if (!isToken) {
      router.push("/login");
      // return (
      //   <div className="w-screen h-screen flex justify-center items-center">
      //     <Loaders />;
      //   </div>
      // );
    }

    if (isToken) {
      return <WrappedComponent {...props} />;
    }
  };

  return Auth;
}
// function PrivateRoute(WrappedComponent) {
//   const Auth = (props) => {
//     const isToken = useSelector((state) => state.user.token);
//     const router = useRouter();

//     useEffect(() => {
//       if (!isToken) {
//         router.push("/login");
//       }
//     }, [isToken, router]);

//     if (isToken) {
//       return <WrappedComponent {...props} />;
//     }
//     return (
//       <div className="w-screen h-screen flex justify-center items-center">
//         <Loaders />;
//       </div>
//     );
//   };

//   return Auth;
// }

export default PrivateRoute;
