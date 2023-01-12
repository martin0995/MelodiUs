import { withAuth } from "next-auth/middleware";
import { useSession, signOut, getSession } from "next-auth/react";
import cookies from "next-cookies";

export async function middleware(req, ev) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  console.log("from middleware ", token);
  return NextResponse.next();
}

export const config = { matcher: ["/logged/home"] };
