import Image from "next/image";
import Link from "next/link";

function CardReceiver(props) {
  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    props.img;
  return (
    <Link
      href={`/transfer/${props.userId}`}
      className="flex w-full rounded-xl shadow-lg px-5 py-2 hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer"
    >
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
      <span className="flex flex-col max-w-[66%] md:w-fit justify-between ml-5">
        <h1 className="md:text-lg font-bold">
          {props.firstName + " " + props.lastName}
        </h1>
        <p className="text-grey text-sm md:text-base">{props.tlp}</p>
      </span>
    </Link>
  );
}

export default CardReceiver;
