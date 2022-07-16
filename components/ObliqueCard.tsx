import React, {useEffect, useState} from "react";
import ShuffleButton from "./ShuffleButton";
import {Popover} from 'react-tiny-popover'
import RewindButton from "./RewindButton";


function ObliqueCard({generalMessages}: {generalMessages: any}) {
  const [messageCounter, setMessageCounter] = useState(0);
  const [message, setMessage] = useState(
    generalMessages[messageCounter].message
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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
    setMessage(generalMessages[messageCounter].message);
    if (window.history.pushState) {
      const url: any = new URL(window.location.toString());
      url.searchParams.set(
        "message",
        encodeURI(generalMessages[messageCounter].message)
      );
      window.history.pushState({}, "", url);
    }
  }, [messageCounter]);

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-lg text-center">Oblique Strategies</h2>
        <Popover
          isOpen={isPopoverOpen}
          padding={5}
          positions={['right', 'top']}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <div className="bg-white rounded-lg p-4 text-sm border border-black shadow-lg">
              <div className="w-52 text-sm">Method for promoting creativity by encouraging lateral thinking jointly created by musician/artist Brian Eno and multimedia artist Peter Schmidt.</div>
              <a className="cursor-pointer underline" href="https://en.wikipedia.org/wiki/Oblique_Strategies" target='_blank'>Learn more</a>
            </div>
          }
        >
          <img className="w-4 cursor-pointer ml-1" src="./icons/info.svg" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
        </Popover>
      </div>

      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max p-5 shadow-gray-400 shadow-lg ">
        <p className="bebe text-2xl mt-auto">{message}</p>
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

export default ObliqueCard;
