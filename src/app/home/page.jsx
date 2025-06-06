import Player from "../components/Player";
import { login } from "../components/login";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const code = (await searchParams).code;

  let accessToken = "";
  try {
    accessToken = await login(code);
  } catch (error) {
    redirect("/");
  }
  return (
    <div>
      <Player accessToken={accessToken} />
    </div>
  );
}
