import React from "react";
import Link from "next/link";
import Image from "next/image";

const dashboard = () => {
  return (
    <div className="bg-green-100 h-full">
      <div className="flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center mt-12">
          <Link href="/">
            <div className="bg-amber-700 h-16 w-36 text-white text-xl rounded-lg text-center justify-center flex items-center">
              Play Scenario
            </div>
          </Link>
          <h1 className="mt-16">Introspectrological Monitor</h1>
          <div className="border h-96 w-96 m-2 text-center relative">
            <h2 className="mt-4 relative">Economy</h2>
            <div className="h-3 w-3 bg-amber-500 z-10 m-0 top-12 mt-0 rounded-full left-36 absolute"></div>
            <div className="bg-amber-300 left-[64px] absolute top-12 mt-1 w-64 h-1 rounded-lg"></div>
            <h2 className="mt-1">Diplomacy</h2>
            <div className="h-2 w-2 bg-amber-500 rounded-full left-36 relative"></div>
            <div className="bg-amber-300 mt-1 h-1 left-[64px] relative w-64 mb-0 rounded-lg"></div>
            <h2 className="mt-8">Government</h2>
            <div className="h-2 w-2 bg-amber-500 rounded-full left-36 relative"></div>
            <div className="bg-amber-300 mt-1 h-1 left-[64px] relative w-64 mb-0 rounded-lg"></div>
            <h2 className="mt-8">Society</h2>
            <div className="h-2 w-2 bg-amber-500 rounded-full left-36 relative"></div>
            <div className="bg-amber-300 mt-1 h-1 left-[64px] relative w-64 mb-0 rounded-lg"></div>
          </div>
          <div className="bg-amber-100 h-72 w-72 mt-12 m-16">
            <Image src="/squirrely.jpg" width={288} height={288} alt="squirrel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
