import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ColoursCard from "../components/ColoursCard";
import SimpleTextCard from "../components/SimpleTextCard";
import {
  fetchColourSchemes,
  fetchMessages,
  fetchSubjects,
} from "../helper/api";
import { shuffleArray } from "../helper/utils";

function Home({
  generalMessages,
  colourSchemes,
  subjectsData,
}: {
  generalMessages: any;
  colourSchemes: any;
  subjectsData: any;
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
          {subjectsData && (
            <SimpleTextCard
              dbColName="subject"
              generalMessages={subjectsData}
              title="Subject"
            />
          )}
        </div>
        <div className="w-64 h-96 flex items-stretch flex-col">
          {colourSchemes && <ColoursCard colourSchemes={colourSchemes} />}
        </div>
        {/* must use the utm_source and utm_medium url param */}
        {/* example snippet:  Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>*/}
        <div className="w-64 h-96 flex items-stretch flex-col">
          {generalMessages && (
            <SimpleTextCard
              dbColName="message"
              generalMessages={generalMessages}
              title="Oblique Strategies"
            />
          )}
        </div>
      </div>
      <div className="text-center p-4 md:mt-8 text-sm">
        <p>Send these specific cards to someone, just send the url!</p>
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

  //subject
  let subjectsData = await fetchSubjects();
  //shuffle so they're in a random order and not alphabetical desc
  subjectsData = shuffleArray(subjectsData);

  //logic to read subject from url param
  if (context?.query?.subject && typeof context.query.subject === "string") {
    //improve in future to check db if exists so you can push a random string
    subjectsData.unshift({
      subject: decodeURIComponent(context.query.subject),
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
    props: { generalMessages, colourSchemes, subjectsData },
  };
};

export default Home;
