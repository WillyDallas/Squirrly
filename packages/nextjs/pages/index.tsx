import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { use } from "react";
import { useScaffoldContractWrite, useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { useAutoConnect, useAccountBalance } from "~~/hooks/scaffold-eth";
import { useAccount, useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { storeNFT } from "../utils/pushToIpfs.js";

const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;

const Home: NextPage = () => {
  const { address: accountAddress } = useAccount();
  const { data: balanceOf } = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", {
    args: [accountAddress],
  });

  const callCheckOwnershipAPI = async (param: any) => {
    try {
      const response = await fetch("./api/checkNFTOwnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ param }),
      });
      const data = await response.json();
      // return data,or set on state, or do something with it
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Squirrly App</title>
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <button
        className="btn btn-primary"
        onClick={async () => {
          const econ = 10;
          const dipl = 20;
          const govt = 30;
          const scty = 40;
          const powers = ["super jump", "invisibility"];
          await storeNFT(econ, dipl, govt, scty, powers, API_KEY);
        }}
      >
        Store NFT
      </button>
      </div>
    </>
  );
};

export default Home;
