import Image from "next/image";

function Comentary(props) {
  return (
    <div className="w-[80vw] md:w-[55vw] md:max-w-[800px] p-4 md:p-10 flex flex-col justify-between items-center rounded-2xl shadow border border-slate-500/10">
      {/* <span className="w-32 h-32 border rounded-3xl"></span> */}

      <div className="avatar">
        <div className="w-32 mask mask-squircle">
          <Image
            src={props.image}
            alt="display-profile"
            width={50}
            height={50}
            className="w-full"
          />
        </div>
      </div>
      <h3 className="font-bold md:text-2xl">{props.name}</h3>
      <p className="md:mb-8">Designer</p>
      <p>{props.comment}</p>
    </div>
  );
}

export default Comentary;
