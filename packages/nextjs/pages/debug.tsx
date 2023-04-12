import type { NextPage } from "next";
import { Debug } from "~~/components/pages"
import { PageError } from "~~/components/PageError";

// this is strictly for dev purposes
// this page simply enables the nav bar link for easier access to the component
// disable this page and link in header for deployment
const isProduction = process.env.NODE_ENV === "production";

const DebugPage: NextPage = () => {
  if (!isProduction) return <Debug />;
  return <PageError />;
};

export default DebugPage;
