import { useSelector } from "react-redux";

function Footer() {
  const userStore = useSelector((state) => state.user.token);
  // console.log(userStore);
  return (
    <footer className="w-full flex justify-center bg-prime">
      {userStore === null ? (
        <>
          <div className="w-full max-w-notebook p-4 md:px-10% md:py-20 flex flex-col text-white">
            <div className="w-full md:w-72">
              <h1 className="font-extrabold text-2xl md:text-4xl">FazzPay</h1>
              <p className="my-8 text-sm md:text-lg">
                Simplify financial needs and saving much time in banking needs
                with one single app.
              </p>
            </div>
            <span className="w-full border-b-2 border-white/80 mb-8"></span>
            <div className="w-full max-w-notebook md:min-h-[12vh] px-4 md:px-10% py-10 md:py-0 flex flex-col items-center md:flex-row text-white">
              <p className="m-auto md:m-0 mb-3 md:mb-0 md:mr-auto">
                2020 FazzPay. All right reserved.
              </p>
              <div className="flex justify-between w-full md:w-fit md:gap-9 text-sm md:text-base">
                <p>+62 5637 8882 9901</p>
                <p>contact@fazzpay.com</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-notebook md:min-h-[12vh] px-4 md:px-10% py-10 md:py-0 flex flex-col items-center md:flex-row text-white">
          <p className="m-auto md:m-0 mb-3 md:mb-0 md:mr-auto">
            2020 FazzPay. All right reserved.
          </p>
          <div className="flex justify-between w-full md:w-fit md:gap-9 text-sm md:text-base">
            <p>+62 5637 8882 9901</p>
            <p>contact@fazzpay.com</p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
