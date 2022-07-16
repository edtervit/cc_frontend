import React, {useEffect, useState} from "react";
import ShuffleButton from "./ShuffleButton";
import {Popover} from 'react-tiny-popover'


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
            <div className="bg-white rounded-lg px-3 py-1 text-sm transition-all">
              <a className="cursor-pointer underline" href="https://en.wikipedia.org/wiki/Oblique_Strategies" target='_blank'>Click here to learn more about oblique strategies.</a>
            </div>
          }
        >
          <img className="w-4 cursor-pointer ml-1" src="./icons/info.svg" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
        </Popover>
      </div>

      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max p-5 shadow-gray-400 shadow-lg ">
        <p className="bebe text-2xl mt-auto">{message}</p>
        <div className="mt-auto" onClick={() => newMessageHandler()}>
          <ShuffleButton />
        </div>
        <p className="justify-self-end text-xs mt-2">
          {messageCounter + 1} of {generalMessages.length}
        </p>
      </div>
    </>
  );
}

export default ObliqueCard;
