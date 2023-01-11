import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="max-w-[1000px] mx-auto flex flex-col justify-center  ">
        <img
          className="w-6/12 mx-auto mb-10  md:mt-12"
          src="./Music.png"
          alt="HTML icon"
        />
      </div>
    </div>
  );
}
