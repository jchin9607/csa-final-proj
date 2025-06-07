"use server";

import axios from "axios";
import qs from "qs";
import { cookies } from "next/headers";

export const login = async (code) => {
  "use server";
  const cookieStore = await cookies();
  if (!code) {
    return;
  }

  if (cookieStore.has("accessToken")) {
    return cookieStore.get("accessToken").value;
  }
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
  };

  let accessToken = "";

  const response = await axios.post(tokenUrl, qs.stringify(data), headers);

  accessToken = response.data.access_token;

  cookieStore.set("accessToken", accessToken);

  return accessToken;
};
