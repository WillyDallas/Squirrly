import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { use } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Quiz from "~~/components/ScrollUi/Quiz";


const ScrollUI: NextPage = () => {

  const { writeAsync: doCheckin } = useScaffoldContractWrite("YourContract", "checkin", null, "0.001");

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <section className="w-full h-screen bg-sky-200 snap-start">Sky</section>
        <section className="w-full h-screen bg-green-200 snap-start">Canopy</section>
        <section className="w-full h-screen bg-amber-400 snap-start">Trees</section>
        <section className="w-full h-screen bg-yellow-200 snap-start">{<Quiz />}</section>
      </main>
        
    </>
  );
};

export default ScrollUI;
