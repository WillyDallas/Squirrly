import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import Quiz from "~~/components/ScrollUi/Quiz";
import Hero from "~~/components/Hero";
import Description from "~~/components/Description";
import Image from "next/image";
import squirrely from "../public/squirrely.jpg";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

const ScrollUI: NextPage = () => {
  const router = useRouter();

  const { address: accountAddress } = useAccount();

  const { data: balanceOf } = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", {
    args: [accountAddress],
  });

  useEffect(() => {
    if (balanceOf?.toNumber() > 0) {
      router.push("/dashboard");
    }
  }, [balanceOf]);

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <section className="w-full h-screen mb-30 bg-cover bg-[url('/landing_mobile.jpg')] md:bg-[url('/landing_desk.jpg')] md:bg-cover bg-top mt-10 snap-start">
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
          <div className="flex flex-row items-center content-center justify-items-start">
            <div className="w-4/12 flex flex-col items-center">
              <div>
                <Image src={squirrely} width="250" height="250" alt="pixel art squirrel" />
              </div>
            </div>

            <div className="w-8/12">{<Quiz />}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ScrollUI;
