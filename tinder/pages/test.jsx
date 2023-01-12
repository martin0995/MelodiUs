import React from "react";
import { useSession, signOut } from "next-auth/react";
const account = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div>
        <p>Bienvenido,{session.user.name}</p>
      </div>
    );
  }
};
export default account;
