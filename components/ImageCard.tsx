import React, {useEffect, useState} from "react";
import ShuffleButton from "./ShuffleButton";
import {Popover} from 'react-tiny-popover'
import RewindButton from "./RewindButton";


function ImageCard({generalMessages, title, dbColName}: {generalMessages: any, title: string, dbColName: string}) {
  const [messageCounter, setMessageCounter] = useState(0);
  const [message, setMessage] = useState(
    generalMessages[messageCounter][dbColName]
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  
  const colourOptions = [];

  const newMessageHandler = () => {
    if (messageCounter + 1 == generalMessages.length) {
      setMessageCounter(0);
    } else {
      setMessageCounter(messageCounter + 1);
    }
  };

  const rewindHandler = () => {
    if (messageCounter === 0) {
      setMessageCounter(generalMessages.length - 1);
    } else {
      setMessageCounter(messageCounter - 1);
    }
  };

  useEffect(() => {
    setMessage(generalMessages[messageCounter][dbColName]);
    if (window.history.pushState) {
      const url: any = new URL(window.location.toString());
      url.searchParams.set(
        dbColName,
        encodeURI(generalMessages[messageCounter][dbColName])
      );
      window.history.pushState({}, "", url);
    }
  }, [messageCounter]);

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-lg text-center">Visual</h2>
        {<Popover
          isOpen={isPopoverOpen}
          padding={5}
          positions={['right', 'top']}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <div className="bg-white rounded-lg p-4 text-sm border border-black shadow-lg">
              <div className="w-52 text-sm">Images are taken from Unsplash, a collection of images donated by photographers worldwide. Although we do our best to match your settings to the images, it's not always accurate, apologies.</div>
              <a className="cursor-pointer underline" href="https://unsplash.com/about" target='_blank'>Learn more</a>
            </div>
          }
        >
          <img className="w-4 cursor-pointer ml-1" src="./icons/info.svg" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
        </Popover>}
      </div>
      {/* must use the utm_source and utm_medium url param */}
      {/* example snippet:  Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>*/}
      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max p-5 shadow-gray-400 shadow-lg ">
        <div className="options-bar border-b border-b-black height-12 w-full mb-auto flex space-x-2">
          <div className="w-1/3 relative">
            <select className="w-full p-1 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline text-xs" placeholder="Select your orientation">
              <option>Portrait</option>
              <option>Landscape</option>
              <option>Squarish</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </div>
          </div>
          <div className="w-1/3 relative">
            <select className="w-full p-1 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline text-xs" placeholder="Select your orientation">
              <option>Portrait</option>
              <option>Landscape</option>
              <option>Squarish</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center space-x-2">
          <div onClick={() => rewindHandler()}>
            <RewindButton />
          </div>
          <div onClick={() => newMessageHandler()}>
            <ShuffleButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageCard;
