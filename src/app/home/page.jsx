"use client";

import Player from "../components/Player";
import { login } from "../components/login";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

// export const dynamic = "force-dynamic";

// export default async function Page({ searchParams }) {
//   const code = (await searchParams).code;

//   let accessToken = "";
//   try {
//     accessToken = await login(code);
//   } catch (error) {
//     throw new Error(error);
//   }
//   return (
//     <div>
//       <Player accessToken={accessToken} />
//     </div>
//   );
// }

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await login(code);
        setAccessToken(token);
      } catch (error) {
        redirect("/");
      }
    };
    fetchAccessToken();
  }, [code]);

  return (
    <>
      {accessToken && <Player accessToken={accessToken} />}
      <div className="h-[calc(100vh-140px)]"></div>
    </>
  );
}
