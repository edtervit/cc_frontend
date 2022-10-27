import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ColoursCard from "../components/ColoursCard";
import ImageCard from "../components/ImageCard";
import SimpleTextCard from "../components/SimpleTextCard";
import {
  fetchAllTopics,
  fetchColourSchemes,
  fetchImages,
  fetchMessages,
  fetchSubjects,
} from "../helper/api";
import {ColourScheme, GeneralMessage, Image, SubjectsData, Topic} from "../helper/types";
import { shuffleArray } from "../helper/utils";

function Home({
  generalMessages,
  colourSchemes,
  subjectsData,
  images,
  topics,
}: {
  generalMessages: GeneralMessage[];
  colourSchemes: ColourScheme[];
  subjectsData: SubjectsData[];
  images: Image[];
  topics: Topic[];
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
      <div className="flex space-y-4 sm:space-x-4 flex-wrap justify-center flex-col sm:flex-row pb-8 sm:pb-0">
        <div className="w-64 h-96 flex items-stretch flex-col sm:mt-4">
          {subjectsData && (
            <SimpleTextCard
              dbColName="subject"
              generalMessages={subjectsData}
              title="Subject"
            />
          )}
        </div>
        <div className="w-64 h-96 flex items-stretch flex-col sm:mt-4">
          {colourSchemes && <ColoursCard colourSchemes={colourSchemes} />}
        </div>
        <div className="w-64 h-96 flex items-stretch flex-col sm:mt-4">
          {generalMessages && (
            <SimpleTextCard
              dbColName="message"
              generalMessages={generalMessages}
              title="Oblique Strategies"
            />
          )}
        </div>
        <div className="w-64 h-96 flex items-stretch flex-col sm:mt-4">
          {generalMessages && (
            <ImageCard
              defaultImages={images}
              topics={topics}
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
  let generalMessages:GeneralMessage[] = await fetchMessages({
    type: "general",
  });
  //shuffle so they're in a random order and not alphabetical desc
  generalMessages = shuffleArray(generalMessages as []);

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
  subjectsData = shuffleArray(subjectsData as []);

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
    //improve in future to check db if exists so you can't push a random string
    const schemeArr: string[] = context.query.scheme.split("-");
    const schemeObj: ColourScheme = {
      fromUrl: true,
      colour1: '',
      colour2: '',
      colour3: '',
      colour4: '',
      colour5: '',
    };
    

    schemeArr.forEach((colour: string, index: number) => {
      //typescript doesn't like this for some reason, TODO : clean this up to not need switch statement
      // schemeObj[`colour${index + 1}` as keyof ColourScheme] = colour;
      
      switch (index) {
        case 0:
          schemeObj.colour1 = colour;
          break;
        case 1:
          schemeObj.colour2 = colour;
          break;
        case 2:
          schemeObj.colour3 = colour;
          break;
        case 3:
          schemeObj.colour4 = colour;
          break;
        case 4:
          schemeObj.colour5 = colour;
          break;
      
        default:
          break;
      }
    });
    colourSchemes.unshift(schemeObj);
    
  }
  
  //images
  let images = null;

  //logic to read image from url param
  if (context?.query?.image && typeof context.query.image === "string") {
    //url format image=1-portrait for image with Id 1 which is portrait;
    
    const imageParamStringArr: string[] = context.query.image.split("-");
    
    const imageId = imageParamStringArr[0];
    const imageOri = imageParamStringArr[1];
    
    images = await fetchImages({
      limit: 100,
      orientation: imageOri,
      skipUnsplashApiCall: 1,
      mustIncludeTheseImages: [imageId],
    });
  } else {
    images = await fetchImages({
      limit: 100,
      orientation: 'portrait',
      skipUnsplashApiCall: 1,
    });
  }
  
  const topicsRaw = await fetchAllTopics();
  const topics = topicsRaw.sort((a: Topic,b: Topic) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  return {
    props: { generalMessages, colourSchemes, subjectsData, images, topics },
  };
};

export default Home;
