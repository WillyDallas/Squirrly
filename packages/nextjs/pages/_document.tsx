import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://public.cypherd.io/js/onboardingsdk.js"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
