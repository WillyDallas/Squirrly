import type { NextPage } from "next";
import { Dashboard } from "~~/components/pages"
import { PageError } from "~~/components/PageError";

// this is strictly for dev purposes
// this page simply enables the nav bar link for easier access to the component
// disable this page and link in header for deployment
const isProduction = process.env.NODE_ENV === "production";

const DashboardPage: NextPage = () => {
  if (!isProduction) return <Dashboard />;
  return <PageError />;
};

export default DashboardPage;
