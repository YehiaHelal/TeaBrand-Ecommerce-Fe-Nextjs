import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req, res) {
  // return NextResponse.redirect(new URL("/home", request.url));
  const cookie = req.cookie.get("jwt");
  const cookieResponse = res.cookie.get("jwt");
  console.log("jwt", cookie);
  console.log("jwt", cookieResponse);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/",
// };
