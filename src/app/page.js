import React from "react";
import LoginButton from "./components/LoginButton";
const page = () => {
  return (
    <div>
      <div className=" w-full h-[calc(100vh-60px)] flex justify-center items-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default page;
