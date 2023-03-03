import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { use } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Quiz from "~~/components/ScrollUi/Quiz";
import Hero from "~~/components/Hero";
import Description from "~~/components/Description";

const ScrollUI: NextPage = () => {
  const { writeAsync: doCheckin } = useScaffoldContractWrite("YourContract", "checkin", null, "0.001");

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <section className="w-full h-screen bg-[url('/mountains.jpg')] bg-cover bg-top snap-start">
          <Hero />
        </section>
        <section className="w-full h-screen bg-[url('/forest.jpg')] bg-cover bg-top snap-start">
          <Description />
        </section>
        {/* <section className="w-full h-screen bg-amber-400 snap-start">Trees</section> */}
        <section className="w-full h-screen bg-yellow-200 snap-start">{<Quiz />}</section>
      </main>
    </>
  );
};

export default ScrollUI;
