import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./userId.module.css";

const matchDescription = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query;
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(0);

  console.log("USER>>", user);

  const handlePhoto = () => {
    if (photo === 0) setPhoto(1);
    else {
      setPhoto(0);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      axios.post("/api/userDescription", { id }).then((data) => setUser(data));
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6 bg-black">
        <div className="relative w-[120%] h-full -left-[10%]  bg-gray-900">
          <div>
            {/* <Image
              src={user.images[photo]}
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
