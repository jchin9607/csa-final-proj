"use server";

import axios from "axios";
import qs from "qs";

export const login = async (code) => {
  "use cache";
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

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
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  };

  let accessToken = "";

  const response = await axios.post(tokenUrl, qs.stringify(data), headers);

  accessToken = response.data.access_token;

  console.log(response.data);
  console.log(accessToken);
  console.log(tokenUrl);
  console.log(process.env.NEXT_PUBLIC_REDIRECT_URI);

  return accessToken;
};
