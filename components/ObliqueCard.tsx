import React, {useState} from "react";
import ShuffleButton from "./ShuffleButton";

function ObliqueCard({generalMessages}: {generalMessages: any}) {

  const [messageCounter, setMessageCounter] = useState(0);

  const newMessageHandler = () => {
    if (messageCounter + 1 == generalMessages.length) {
      setMessageCounter(0);
    } else {
      setMessageCounter(messageCounter + 1);
    }
  };
  return (
    <>
      <h2 className="text-lg text-center mb-4">Oblique Strategies</h2>
      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max p-5 shadow-gray-400 shadow-lg ">
        <p className="bebe text-2xl mt-auto">{generalMessages[messageCounter].message}</p>
        <div className="mt-auto" onClick={() => newMessageHandler()}>
          <ShuffleButton />
        </div>
        <p className="justify-self-end text-xs mt-2">
          {messageCounter + 1} of {generalMessages.length}
        </p>
      </div>
    </>
  )
}

export default ObliqueCard