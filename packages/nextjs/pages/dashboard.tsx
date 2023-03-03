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
          <div className="bg-amber-100 h-72 w-72 m-2">
            <Image
              src="/squirrel-icon.png"
              width={20}
              height={20}
              alt="squirrel-icon"
              className="rounded-full relative top-8 left-36"
            />
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
