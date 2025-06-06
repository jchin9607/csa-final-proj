"use client";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  function login() {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const responseType = "code";
    const scopes =
      "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify";
    const endpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scopes}`;

    window.location.href = endpoint;
  }

  return (
    <Button variant={"outline"} onClick={login}>
      Sign In
    </Button>
  );
};

export default LoginButton;
