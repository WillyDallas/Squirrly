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

const Home: NextPage = () => {
  //const { writeAsync: doCheckin } = useScaffoldContractWrite("SquirrlyNFT", "checkin", null, "0.001");
  const { data: deployedContractData } = useDeployedContractInfo("SquirrlyNFT");
  //console.log("deployed contract address", deployedContractData?.address);
  const { address: accountAddress } = useAccount();
  //console.log("account address", accountAddress);

  //const { balance } = useAccountBalance(accountAddress);
  //console.log('balance', balance)

  //const balanceOf = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", ['0x8555eB2a135074B67e95C5bA9297b0229e90B5A3']);
  //const { data: balanceOf } = useContractRead(deployedContractData?.address, 'balanceOf', accountAddress)

  const balanceRead = useContractRead({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi,
    functionName: 'balanceOf',
    args: [accountAddress],
  })
  const { data } = balanceRead
  const balance = data ? data.toNumber() : null
  console.log("balance", balance);

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <button
          className="btn btn-primary"
          onClick={() => {
            doCheckin();
          }}
        >
          Check In
        </button>
      </div>

      <div className="flex items-center flex-col flex-grow pt-10">
        <button
          className="btn btn-primary"
          onClick={() => {
            checkIsCollectionOwner(accountAddress, deployedContractData?.address);
          }}
        >
          Check Ownership
        </button>
      </div>
    </>
  );
};

export default Home;
