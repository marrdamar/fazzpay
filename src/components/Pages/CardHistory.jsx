import Image from "next/image";

function CardHistory(props) {
  const date = new Date(props.times);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // console.log(formattedDate);

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    props.img;
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center px-5 py-3 border-b">
      <div className="w-full md:w-fit flex items-center">
        <span className="flex justify-center items-center">
          <div className="avatar">
            <div className="w-16 mask mask-squircle">
              <Image
                src={props.img ? imgUrl : "/images/users.webp"}
                alt="display-profile"
                width={50}
                height={50}
                className="w-full"
              />
            </div>
          </div>
        </span>
        <span className="flex flex-col w-full md:w-fit gap-2 justify-between ml-5">
          <h1 className="md:text-lg font-bold">{props.fullName}</h1>
          <div className="text-grey text-sm md:text-base flex justify-between w-full md:w-fit gap-5">
            <p className="font-bold uppercase">{props.type}</p>
            <p className="italic text-sm md:text-base">{formattedDate}</p>
          </div>
        </span>
      </div>
      <div className="flex flex-col w-full md:w-fit ml-auto pr-5">
        <p
          className={`text-2xl md:text-lg ${
            props.type === "accept" || props.type === "topup"
              ? "text-green-500"
              : "text-secondary"
          } font-bold text-center md:text-end`}
        >
          {props.type === "accept" || props.type === "topup" ? "+ " : "- "}
          Rp. {props.amount.toLocaleString("id-ID")}
        </p>
        <p className="text-center md:text-end">{props.notes || "-"}</p>
      </div>
    </div>
  );
}

export default CardHistory;
