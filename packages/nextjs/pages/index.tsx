import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { use } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
<<<<<<< Updated upstream

  const { writeAsync: doCheckin } = useScaffoldContractWrite("YourContract", "checkin", null, "0.001");
=======
  const { writeAsync: doCheckin } = useScaffoldContractWrite("SquirrlyNFT", "checkin", null, "0.001");
>>>>>>> Stashed changes

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
    </>
  );
};

export default Home;
