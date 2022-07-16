import React, {useEffect, useState} from "react";
import {copyTextToClipboard} from "../helper/utils";
import RewindButton from "./RewindButton";
import ShuffleButton from "./ShuffleButton";

function ColoursCard({colourSchemes}: {colourSchemes: any}) {
  const [schemeCounter, setSchemeCounter] = useState(0);
  const [colours, setColours] = useState<null | string[]>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(-1);

  const copyTextHandler = (text: string, index: number) => {
    copyTextToClipboard("#" + text.toLocaleUpperCase());
    setShowCopiedMessage(index);
    setTimeout(() => {
      setShowCopiedMessage(-1);
    }, 1000);
  };

  const newSchemeHandler = () => {
    if (schemeCounter + 1 == colourSchemes.length) {
      setSchemeCounter(0);
    } else {
      setSchemeCounter(schemeCounter + 1);
    }
  };
  
  const rewindHandler = () => {
    if (schemeCounter === 0) {
      setSchemeCounter(colourSchemes.length - 1);
    } else {
      setSchemeCounter(schemeCounter - 1);
    }
  };

  useEffect(() => {
    const coloursArray: string[] = [];
    for (let index = 0; index < 5; index++) {
      coloursArray.push(colourSchemes[schemeCounter][`colour${index + 1}`]);
    }
    setColours(coloursArray);

    //update query string
    if (window.history.pushState) {
      const url: any = new URL(window.location.toString());
      url.searchParams.set("scheme", coloursArray.join("-"));
      window.history.pushState({}, "", url);
    }
  }, [schemeCounter]);

  return (
    <>
      <h2 className="text-lg text-center mb-4">Colour Schemes</h2>
      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max py-5 shadow-gray-400 shadow-lg ">
        <div className="flex w-full flex-col items-stretch h-full pb-4">
          {colours &&
            colours.map((colour: string, index: number) => {
              return (
                <div
                  className="w-full flex-1 cursor-pointer overflow-hidden"
                  style={{backgroundColor: "#" + colour}}
                  key={index}
                  onClick={() => copyTextHandler(colour, index)}
                >
                  <div className="bebe text-white bg-gray-500 w-max p-1 bg-opacity-20 text-sm ">
                    {" "}
                    {showCopiedMessage === index
                      ? "Copied to Clipboard!"
                      : "#" + colour}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-auto flex items-center space-x-2">
          <div onClick={() => rewindHandler()}>
            <RewindButton />
          </div>
          <div onClick={() => newSchemeHandler()}>
            <ShuffleButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default ColoursCard;
