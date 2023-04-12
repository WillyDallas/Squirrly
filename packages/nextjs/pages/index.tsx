import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { Landing, Dashboard, Quest } from "~~/components/pages"

type Router = {
  [key: number]: React.ReactNode;
};

const Home: NextPage = () => {
  const router: Router = {
    0: <Landing />,
    1: <Dashboard />,
    2: <Quest />,
  };
  const [routerState, setRouterState] = useState<number>(0);
  const { address: accountAddress, isConnected } = useAccount();

  // read whether user holds a squirrly
  const { data: balanceOf } = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", {
    args: [accountAddress],
  });

  // read whether user has a quest ready
  // const { data: quest } = useScaffoldContractRead<BigNumber>("Quest", "balanceOf", {
  //   args: [accountAddress],
  // });

  useEffect(() => {
    // if user is holder but no quest ready, send to dashboard
    if (balanceOf?.toNumber() > 0) {
      setRouterState(1);
    }
    // add logic for sending to quest if user is holder and quest is ready

    // send back to homepage if wallet is disconnected
    if (!isConnected) {
      setRouterState(0);
    }
  }, [balanceOf, isConnected]);

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      {router[routerState]}
    </>
  );
};

export default Home;
