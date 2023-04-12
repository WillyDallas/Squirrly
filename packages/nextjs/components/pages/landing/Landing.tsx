import Head from "next/head";
import React from "react";
import Quiz from "~~/components/quiz/Quiz";
//import Hero from "~~/components/Hero";
import Description from "~~/components/Description";
import Image from "next/image";
//import squirrely from "../public/squirrely.jpg";

export const Landing = () => {

  return (
    <>
      <Head>
        <title>Squirrly App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      {/* original */}
      {/* <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <section className="w-full h-screen mb-30 bg-cover bg-[url('/landing_mobile.jpg')] md:bg-[url('/landing_desk.jpg')] md:bg-cover bg-top mt-10 snap-start">
          <Hero />
        </section>
        <section className="w-full h-screen bg-gradient-to-r from-yellow-300 to-green-700 bg-top snap-start">
          <Description />
        </section>
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
      </main> */}

      {/* version 1 with three different images */}
      <main>
        <div className="parallax1">
          <Image src="/landing.jpeg" alt="pixel art squirrel" width={500} height={200} />
          <Image src="/tree1.png" alt="tree" width={50} height={50} className="top-24 left-3 fixed" />
        </div>
        <div>
          <Description />
        </div>
        <div className="parallax2"></div>
        <div>
          <Description />
        </div>
        <div className="parallax3">
          <div>
            <Quiz />
          </div>
        </div>
      </main>

      {/* version 2 with one image */}
      {/* <main>
        <div className="parallax4"></div>
        <div><Description /></div>
          <div>
            <Quiz/>
          </div>
      </main> */}
    </>
  );
};

