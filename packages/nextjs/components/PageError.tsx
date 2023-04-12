import Link from "next/link";

export const PageError = () => {

  return (
    <div className="h-screen w-full">
      <div className="container mx-auto w-full px-4">
        <div className="m-8 p-4 flex flex-col items-center justify-center mx-auto">
          <p className="text-5xl">404</p>
          <p>The page you are looking for does not exist.</p>
          <Link href="/" passHref>
            <button className="bg-amber-600 m-2 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded text-lg">
              Back to Squirrly
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

