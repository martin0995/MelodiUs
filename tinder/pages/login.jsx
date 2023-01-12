import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navigate } from "react-router-dom";

const login = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div>
        <p>Bienvenido,{session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>No estas loguiado</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
};

export default login;
