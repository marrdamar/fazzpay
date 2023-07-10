import React from "react";
import Head from "next/head";

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>FazzPay | {title}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
