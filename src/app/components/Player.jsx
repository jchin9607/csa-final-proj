"use client";

import SpotifyPlayer from "react-spotify-web-playback";
import { useState } from "react";
// const Player = ({ accessToken }) => {
//   return <SpotifyPlayer token={accessToken} layout="compact" />;
// };

import Image from "next/image";

const Player = ({ accessToken }) => {
  const [info, setInfo] = useState(null);

  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <div className="flex flex-col w-[300px]  h-full items-center justify-center gap-4">
          <Image
            src={info?.track?.image || "/vercel.svg"}
            width={300}
            height={300}
            alt="Spotify Logo"
            className="w-[300px] h-[300px]"
          />
          <div className=" w-full">
            <h1 className="text-xl font-bold ">
              {info?.track?.name || "Unkown"}
            </h1>
            <p className="text-sm text-neutral-600">
              {info?.track?.artists[0]?.name || "Unknown"}
            </p>
          </div>
        </div>
      </div>
      <SpotifyPlayer
        token={accessToken}
        className="fixed bottom-0"
        styles={{
          activeColor: "#737373",
          bgColor: "transparent",
          color: "#737373",
          loaderColor: "#737373",
          sliderColor: "#737373",
          trackArtistColor: "#ccc",
          trackNameColor: "#737373",
          sliderHandleColor: "#737373",
        }}
        showSaveIcon
        callback={(state) => {
          setInfo(state);
        }}
        uris={["spotify:track:60wwxj6Dd9NJlirf84wr2c"]}
        play={true}
      />
    </>
  );
};

export default Player;
