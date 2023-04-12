import type { NextPage } from "next";
import { Quest } from "~~/components/pages"
import { PageError } from "~~/components/PageError";

// this is strictly for dev purposes
// this page simply enables the nav bar link for easier access to the component
// disable this page and link in header for deployment
const isProduction = process.env.NODE_ENV === "production";

const QuestPage: NextPage = () => {
  if (!isProduction) return <Quest />;
  return <PageError />;
};

export default QuestPage;
