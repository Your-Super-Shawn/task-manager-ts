import React from "react";
import Head from "next/head";

interface Props {
  pageTitle: string;
}

const PageHead = ({ pageTitle }: Props) => {
  return (
    <Head>
      <title>{`${pageTitle} - Task Manager`}</title>
      <meta name="description" content="Beautiful & Easy To Use!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
