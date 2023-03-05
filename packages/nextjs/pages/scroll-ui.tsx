import type { NextPage } from "next";
import Head from "next/head";
//import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
//import Link from "next/link";
import React from "react";
//import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Quiz from "~~/components/ScrollUi/Quiz";
import Hero from "~~/components/Hero";
import Description from "~~/components/Description";
import Image from 'next/image'
import squirrely from '../public/squirrely.jpg'

const ScrollUI: NextPage = () => {
  //const { writeAsync: doCheckin } = useScaffoldContractWrite("YourContract", "checkin", null, "0.001");

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <section className="w-full h-screen bg-[url('/landing_desk.jpg')] bg-cover bg-top mt-10 snap-start">
          <Hero />
        </section>
        <section className="w-full h-screen bg-gradient-to-r from-yellow-300 to-green-700 bg-top snap-start">
          {/* <div className="overflow-hidden">
            <div >
            <Description />
            </div>

          </div> */}
          <Description />
        </section>
        {/* <section className="w-full h-screen bg-amber-400 snap-start">Trees</section> */}
        <section className="w-full h-screen bg-top snap-start">
          <div>
            {/* <Image src={squirrely} width="250" height="250" alt="pixel art squirrel"/> */}
            {<Quiz />}
          </div>
        </section>
      </main>
    </>
  );
};

export default ScrollUI;
