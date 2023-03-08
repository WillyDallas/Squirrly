import React, { useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import squirrlData from "../public/metadata.json";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

console.log(squirrlData.name);

const convertAttr = (n: number) => {
  n = n * 2.56 + 64;
  return n.toString() + "px";
};

const Dashboard: NextPage = () => {
  const router = useRouter();

  const { address: accountAddress, isConnected } = useAccount();

  const { data: balanceOf } = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", {
    args: [accountAddress],
  });

  useEffect(() => {
    if (balanceOf?.toNumber() == 0 || !isConnected) {
      router.push("/");
    }
  }, [balanceOf]);

  return (
    <div className="bg-green-100 h-full">
      <div className="flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center mt-12">
          {/* Play Scenario */}
          <Link href="/quest">
            <div className="bg-amber-700 h-16 w-36 text-white text-xl rounded-lg text-center justify-center flex items-center">
              Play Scenario
            </div>
          </Link>

          {/* Stat Visualisation */}
          <h1 className="mt-16 p-0 text-2xl">Your Squirrldeology</h1>
          <div className="h-96 w-96 m-2 mb-0 text-center relative">
            <div className="m-0">
              <h2 className="mt-4 text-lg relative">Economy</h2>
              <div
                className="h-3 w-3 bg-amber-800 z-10 m-0 top-[54px] mt-0 rounded-full absolute"
                style={{ left: `${convertAttr(squirrlData.attributes.econScore)}` }}
              ></div>
              <div className="bg-amber-300 left-[64px] absolute top-[54px] mt-1 w-64 h-1 rounded-lg"></div>
              <div className="flex mt-[24px] mb-0 justify-between text-amber-800">
                <h3 className="">Market</h3>
                <h3 className="text-right">Planned</h3>
              </div>
            </div>
            <div>
              <h2 className="mt-2 text-lg relative">Diplomacy</h2>
              <div
                className="h-3 w-3 bg-amber-700 z-10 m-0 top-[130px] mt-0 rounded-full absolute"
                style={{ left: `${convertAttr(squirrlData.attributes.diplScore)}` }}
              ></div>
              <div className="bg-amber-300 top-[130px] mt-1 h-1 left-[64px] absolute w-64 mb-0 rounded-lg"></div>
              <div className="flex m-0 mt-2 justify-between  text-amber-700">
                <h3 className="">Isolation</h3>
                <h3 className="text-right">Global</h3>
              </div>
            </div>
            <div>
              <h2 className="mt-4 text-lg relative">Government</h2>
              <div
                className="h-3 z-10 w-3 bg-amber-600 rounded-full absolute top-[206px]"
                style={{ left: `${convertAttr(squirrlData.attributes.govtScore)}` }}
              ></div>
              <div className="bg-amber-300 mt-1 h-1 left-[64px] absolute top-[206px] w-64 mb-0 rounded-lg"></div>
              <div className="flex mt-0 justify-between text-amber-600">
                <h3 className="">Liberty</h3>
                <h3 className="text-right">Order</h3>
              </div>
            </div>
            <div>
              <h2 className="mt-4 text-lg relative">Society</h2>
              <div
                className="h-3 w-3 z-10 bg-amber-500 rounded-full absolute top-[282px]"
                style={{ left: `${convertAttr(squirrlData.attributes.sctyScore)}` }}
              ></div>
              <div className="bg-amber-300 mt-1 h-1 left-[64px] absolute top-[282px] w-64 mb-0 rounded-lg"></div>
              <div className="flex mt-[18px] justify-between text-amber-500">
                <h3 className="">Traditional</h3>
                <h3 className="text-right">Progressive</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-100 h-72 w-72 mt-12 m-16">
          <Image src="/squirrely.jpg" width={288} height={288} alt="squirrel" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
