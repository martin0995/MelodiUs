import React from "react";
import { useSession, signOut } from "next-auth/react";


const home = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
        <p>Bienvenido,{session.user.name}</p>
      </div>
    );
  }
};
export default home;
