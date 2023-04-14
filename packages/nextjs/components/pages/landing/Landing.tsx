import Head from "next/head";
import React from "react";
import Quiz from "~~/components/quiz/Quiz";
//import Hero from "~~/components/Hero";
//import Description from "~~/components/Description";
import Image from "next/image";
//import squirrely from "~~/public/squirrely.jpg";

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

      {/* trial version with three different images */}
      {/* <main>
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
      </main> */}

      {/* trial version with background gradients and image overlays */}
      {/* <main>
        <div className="w-screen h-screen bg-gradient-to-b from-skyDark to-skyLight">
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[300px] left-[70px] z-0"
          />
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[191px] right-[50px] z-0"
          />
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[137px] left-[90px] z-0"
          />
        </div>
        <div className="bg-gradient-to-b from-skyLight via-forestSky to-forestFloor">
          <Image
            src="/tree1(transparent).png"
            alt="pixel art tree"
            width={1000}
            height={3000}
            className="absolute bottom-0 right-0"
          />
          <Image
            src="/tree3(transparent).png"
            alt="pixel art tree"
            width={1000}
            height={3000}
            className="absolute bottom-100 right-[-200px]"
          />
          <Image
            src="/tree1(transparent).png"
            alt="pixel art tree"
            width={1000}
            height={3000}
            className="absolute bottom-100 left-[-200px]"
          />
          <Image
            src="/tree3(transparent).png"
            alt="pixel art tree"
            width={1000}
            height={3000}
            className="absolute bottom-0 left-0"
          />
          <div>
            <Quiz />
          </div>
        </div>
      </main> */}
      {/* trial version mixing background gradients and images */}
      <main>
      <div className="w-screen h-screen bg-gradient-to-b from-skyDark to-skyLight">
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[300px] left-[70px] z-0"
          />
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[191px] right-[50px] z-0"
          />
          <Image
            src="/assets/clouds/cloud.svg"
            alt="pixel art cloud"
            width={100}
            height={100}
            className="absolute top-[137px] left-[90px] z-0"
          />
        </div>
        <div className="w-screen h-screen bg-gradient-to-b from-skyLight to-forestClearingSky"></div>
        {/* <div>
          <Description />
        </div> */}
        <div className="parallax3">
          <div>
            <Quiz />
          </div>
        </div>
      </main>
    </>
  );
};

