import React, {useEffect, useState} from "react";
import ShuffleButton from "./ShuffleButton";
import {Popover} from 'react-tiny-popover'
import RewindButton from "./RewindButton";
import {CirclePicker} from 'react-color';
import {colourSwitch, selectedColourObject} from "../helper/image-card";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import LoadingSpinner from "./LoadingSpinner";
import {fetchImages} from "../helper/api";
import {Image, ImageRequestPayload, Topic} from "../helper/types";



function ImageCard({defaultImages, topics}: {defaultImages: Image[], topics: Topic[]}) {

  const [imageCounter, setImageCounter] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isColourPopoverOpen, setIsColourPopoverOpen] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)

  const [selectedColour, setSelectedColour] = useState<undefined | selectedColourObject>(undefined);
  const [selectedTopic, setSelectedTopic] = useState('Random Subject');
  const [selectedOri, setSelectedOri] = useState('Portrait');

  const [images, setImages] = useState(defaultImages)
  const [loading, setLoading] = useState(false)

  const [loadingImage, setLoadingImage] = useState(false);
  //default size is portrait
  const [cardImageSize, setCardImageSize] = useState({height: '12rem', width: '9rem'})

  const colourOptions: string[] = [
    'gray', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue'
  ];

  const colourChangeHandler = (colour: string) => {
    const colourObject = colourSwitch(colour);
    colourObject && setSelectedColour(colourObject);
  }

  const newImageHandler = () => {
    setLoadingImage(true);
    if (imageCounter + 1 == images.length) {
      setImageCounter(0);
    } else {
      setImageCounter(imageCounter + 1);
    }
  };

  const rewindHandler = () => {
    setLoadingImage(true);
    if (imageCounter === 0) {
      setImageCounter(images.length - 1);
    } else {
      setImageCounter(imageCounter - 1);
    }
  };

  //get the new data when colour/topic/oreintation is changed
  useEffect(() => {
    //set card image size based on ori
    switch (selectedOri) {
      case 'Portrait':
        setCardImageSize({height: '12rem', width: '9rem'})
        break;
      case 'Landscape':
        setCardImageSize({height: '10rem', width: '15rem'})
        break;
      case 'Squarish':
        setCardImageSize({height: '12rem', width: '12rem'})
        break;

      default:
        break;
    }

    let payload: ImageRequestPayload = {
      skipUnsplashApiCall: 0,
      orientation: selectedOri.toLocaleLowerCase()
    };
    
    if (selectedColour) {
      payload.colour = selectedColour.slug;
    }

    if (selectedTopic && selectedTopic !== 'Random Subject') {
      payload.topic = selectedTopic;
    }

    //use to prevent useEffect calling endpoint on default values when it should instead just use defaultImages
    let isDefaultOptions = false;
    if (selectedTopic === 'Random Subject' && selectedColour === undefined && selectedOri === 'Portrait') {
      isDefaultOptions = true;
      setImages(defaultImages);
    }

    const controller = new AbortController();
    if (!isDefaultOptions) {
      setLoading(true);
      (async () => {
        try {
          const result = await fetchImages(payload, controller.signal);
          setImages(result);
          setImageCounter(0);
          setLoading(false);
        } catch (error: any) {
          if (error.name !== "CanceledError") {
            setLoading(false);
            console.error(error);
          }
          if (error.name === "CanceledError") {
            console.log('Cancelled previous request')
          }
        }
      })();
    }

    return () => {
      controller.abort();
    };
  }, [selectedTopic, selectedColour, selectedOri])

  //update url with current image
  useEffect(() => {
    //update query string
    if (window.history.pushState && images.length > 0) {
      const url: URL = new URL(window.location.toString());
      url.searchParams.set("image", images[imageCounter].id + '-' + images[imageCounter].orientation);
      window.history.pushState({}, "", url);
    }
  }, [imageCounter, images])


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
      <div className="flex flex-col flex-1 w-full items-center justify-center text-center bg-white text-black rounded-3xl min-h-max p-5 pt-1 shadow-gray-400 shadow-lg ">
        <div className="options-bar border-b border-b-black height-12 w-full mb-auto flex flex-wrap py-1">
          <div className="w-full relative">
            <select className="w-full p-1 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline text-xs" placeholder="Select your orientation"
              value={selectedOri}
              onChange={(e) => setSelectedOri(e.target.value)}
            >
              <option>Portrait</option>
              <option>Landscape</option>
              <option>Squarish</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
          <div className="relative">
            {/* {<Popover
              isOpen={isColourPopoverOpen}
              padding={5}
              positions={['right', 'top']}
              onClickOutside={() => setIsColourPopoverOpen(false)}
              content={
                <div className="bg-gray-200 rounded-lg p-4 text-sm border border-black shadow-lg">
                  <CirclePicker colors={colourOptions} onChange={(i) => colourChangeHandler(i.hex)} />
                </div>
              }
            >
              <div>
                {selectedColour === undefined ? (
                  <div className="w-6 h-6 rounded-full cursor-pointer border border-black bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500" onClick={() => setIsColourPopoverOpen(!isPopoverOpen)}>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full cursor-pointer border border-black" style={{backgroundColor: selectedColour.hex}} onClick={() => setIsColourPopoverOpen(!isPopoverOpen)}>
                  </div>
                )
                }
              </div>
            </Popover>} */}
          </div>
          <div className="w-full relative mt-2">
            <select className="w-full p-1 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline text-xs"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option>Random Subject</option>
              {topics.map((topic: Topic, index: number) => {
                return (
                  <option key={index} value={topic.slug}>
                    {topic.name}
                  </option>
                )
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
        <div className="credit-cont text-xs mb-1">
          Images provided by <a href="https://unsplash.com/?utm_source=creativity_cards&utm_medium=referral" target={'_blank'} className="underline cursor-pointer">Unsplash</a>
        </div>
        <div className="image-container" >
          <div className="overflow-hidden relative" style={{height: cardImageSize.height, width: cardImageSize.width}}>
            {loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <LoadingSpinner black={true} />
              </div>
            ) : (
              <>
                {images.length > 0 ? (
                  <>
                    <div className="absolute bg-white bg-opacity-50 bottom-0 text-xs p-1 underline cursor-pointer w-full">
                      <a href={images[imageCounter].artistProfileUrl + '?utm_source=creativity_cards&utm_medium=referral'} target="_blank">{images[imageCounter].artistName}</a>
                    </div>
                    {showLightbox && <Lightbox onClose={() => setShowLightbox(false)} image={images[imageCounter].url} title={<a href={images[imageCounter].artistProfileUrl + '?utm_source=creativity_cards&utm_medium=referral'} target="_blank">{images[imageCounter].artistName}</a>} />}
                    <img className="w-full h-full object-cover cursor-pointer z-10" src={images[imageCounter].url.replace('w=1080', 'w=300')} alt={images[imageCounter].description ?? 'no description found, sorry'} onClick={() => setShowLightbox(true)} onLoad={() => setLoadingImage(false)} style={loadingImage ? {display: 'none'} : {}} />
                    <div className="flex justify-center items-center w-full h-full" style={!loadingImage ? {display: 'none'} : {}}>
                      <LoadingSpinner black={true} />
                    </div>
                  </>
                ) : (
                  <>
                    Sorry, these options returned 0 results. Try using less filters or a different combo.
                  </>
                )}

              </>
            )}
          </div>
        </div>
        <div className="mt-auto flex items-center space-x-2">
          <div onClick={() => rewindHandler()}>
            <RewindButton />
          </div>
          <div onClick={() => newImageHandler()}>
            <ShuffleButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageCard;
