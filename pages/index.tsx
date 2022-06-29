import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { fetchMessages } from "../helper/api";

function Home({ messages }: { messages: any }) {
  const [messageCounter, setMessageCounter] = useState(0);

  const newMessageHandler = () => {
    if (messageCounter + 1 == messages.length) {
      setMessageCounter(0);
    } else {
      setMessageCounter(messageCounter + 1);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center pt-4 bg-black text-white box-border cursor-pointer"
      onClick={() => newMessageHandler()}
    >
      <Head>
        <title>Creativity Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-xl">Creativity Cards</h1>
      </div>
      <main className="w-full items-center h-full  text-center mt-auto">
        <h2 className="text-6xl bebe">{messages[messageCounter].message}</h2>
        <p className="mt-4">
          {messageCounter + 1} of {messages.length}
        </p>
      </main>
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
  const messages = await fetchMessages();

  return {
    props: { messages },
  };
};

export default Home;
