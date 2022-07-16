import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ColoursCard from "../components/ColoursCard";
import ObliqueCard from "../components/ObliqueCard";
import { fetchColourSchemes, fetchMessages } from "../helper/api";
import { shuffleArray } from "../helper/utils";

function Home({
  generalMessages,
  colourSchemes,
}: {
  generalMessages: any;
  colourSchemes: any;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-4 bg-black text-white box-border">
      <Head>
        <title>Creativity Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-2xl text-center">Creativity Cards</h1>
        <h2 className="mb-8 text-center">
          Spark inspiration, break the creative block.
        </h2>
      </div>
      <div className="flex sm:space-x-4 flex-wrap justify-center space-y-4 sm:space-y-0 flex-col sm:flex-row pb-8 sm:pb-0">
        <div className="w-64 h-96 flex items-stretch flex-col">
          {generalMessages && <ObliqueCard generalMessages={generalMessages} />}
        </div>
        <div className="w-64 h-96 flex items-stretch flex-col">
          {colourSchemes && <ColoursCard colourSchemes={colourSchemes} />}
        </div>
      </div>
      <footer className="flex w-full justify-center border-t items-end self-end mt-auto p-2">
        <a
          className="flex items-center justify-center"
          href="https://edtervit.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Ed Tervit
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //messages
  let generalMessages = await fetchMessages({
    type: "general",
  });
  //shuffle so they're in a random order and not alphabetical desc
  generalMessages = shuffleArray(generalMessages);

  //logic to read message from url param
  if (context?.query?.message && typeof context.query.message === "string") {
    //improve in future to check db if exists so you can push a random string
    generalMessages.unshift({
      message: decodeURIComponent(context.query.message),
      fromUrl: true,
    });
  }

  //colour-schemes
  const colourSchemes = await fetchColourSchemes({
    limit: 100,
    random_order: 1,
  });

  //logic to read colour scheme from url param
  if (context?.query?.scheme && typeof context.query.scheme === "string") {
    //improve in future to check db if exists so you can push a random string
    const schemeArr: string[] = context.query.scheme.split("-");
    const schemeObj: any = {
      fromUrl: true,
    };

    schemeArr.forEach((colour, index) => {
      schemeObj[`colour${index + 1}`] = colour;
    });

    colourSchemes.unshift(schemeObj);
  }

  return {
    props: { generalMessages, colourSchemes },
  };
};

export default Home;
