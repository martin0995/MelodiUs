import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const matchDescription = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query;

  useEffect(() => {
    axios
      .post("/api/userDescription", { id })
      .then((data) => console.log("USUARIO>", data));
  }, []);

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6 bg-black">
        <div className="relative w-[120%] h-full -left-[10%]  bg-gray-900">
          <div>
            {/* <Image
              src={}
              alt="Users pictures"
              fill
              className={`object-cover object-center absolute z-5 ${styles.perspectiveBack}`}
              onClick={handlePhoto}
            /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default matchDescription;
