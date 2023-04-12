import { Answer } from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { WBWChunk } from "@/types";
import { getImage } from "@/utils/images";
import { IconArrowRight, IconExternalLink, IconSearch } from "@tabler/icons-react";
import endent from "endent";
import Head from "next/head";
import Image from "next/image";
import { KeyboardEvent, useEffect, useRef, useState } from "react";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<WBWChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [matchCount, setMatchCount] = useState<number>(5);

  const handleAnswer = async () => {
    if (!query) {
      alert('Please enter a query.');
      return;
    }
  
    setAnswer('');
    setChunks([]);
  
    setLoading(true);
  
    // Create a WebSocket connection to the '/chat' endpoint
    const socket = new WebSocket(`${BACKEND_URL}/chat`);
  
    // Set up the WebSocket event listeners
    socket.onopen = (event) => {
      // Send the query once the WebSocket connection is open
      socket.send(query);
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLoading(false);
  
      // Check if the received data has a 'message' key
      if (data.hasOwnProperty('message') && data.sender === 'bot') {
        // Update the answer with the received message
        setAnswer((prev) => prev + data.message);
      }
  
      // Close the WebSocket connection if the server has indicated that it's done sending messages
      if (data.type && data.type === 'end') {
        setLoading(false);
        socket.close();
      }
    };
  
    socket.onerror = (error) => {
      setLoading(false);
      console.error('WebSocket error:', error);
    };
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const handleSave = () => {
    localStorage.setItem("WBW_MATCH_COUNT", matchCount.toString());

  };

  const handleClear = () => {
    localStorage.removeItem("WBW_KEY");
    localStorage.removeItem("WBW_MATCH_COUNT");

    setMatchCount(5);
  };

  useEffect(() => {
    if (matchCount > 10) {
      setMatchCount(10);
    } else if (matchCount < 1) {
      setMatchCount(1);
    }
  }, [matchCount]);

  useEffect(() => {
    const WBW_KEY = localStorage.getItem("WBW_KEY");
    const WBW_MATCH_COUNT = localStorage.getItem("WBW_MATCH_COUNT");

    if (WBW_MATCH_COUNT) {
      setMatchCount(parseInt(WBW_MATCH_COUNT));
    }

  }, []);

  return (
    <>
      <Head>
        <title>Wait But Why GPT</title>
        <meta
          name="description"
          content={`AI-powered search and chat for Tim Urban's blog "Wait But Why."`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">

              <div className="relative w-full mt-4">
                <IconSearch className="absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

                <input
                  ref={inputRef}
                  className="h-12 w-full rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
                  type="text"
                  placeholder="What is JSS4P?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button>
                  <IconArrowRight
                    onClick={handleAnswer}
                    className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                  />
                </button>
              </div>

            {loading ? (
              <div className="mt-6 w-full">
                  <>
                    <div className="font-bold text-2xl">Answer</div>
                    <div className="animate-pulse mt-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </>

                {chunks.length ? (
                  <>
                    <div className="font-bold text-2xl mt-6">Passages</div>
                    <div className="animate-pulse mt-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </>) : ''}
              </div>
            ) : answer ? (
              <div className="mt-6 w-full">
                <div className="font-bold text-2xl mb-2">Answer</div>
                <Answer text={answer} />

                <div className="mt-6 mb-16">
                {chunks.length ? (<div className="font-bold text-2xl">Passages</div>) : ''}

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <div className="mt-4 border border-zinc-600 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Image
                              className="rounded-lg"
                              src={getImage(chunk.post_title)}
                              width={103}
                              height={70}
                              alt={chunk.post_title}
                            />
                            <div className="ml-4">
                              <div className="font-bold text-xl">{chunk.post_title}</div>
                              <div className="mt-1 font-bold text-sm">{chunk.post_date}</div>
                            </div>
                          </div>
                          <a
                            className="hover:opacity-50 ml-4"
                            href={chunk.post_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IconExternalLink />
                          </a>
                        </div>
                        <div className="mt-4">{chunk.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : chunks.length > 0 ? (
              <div className="mt-6 pb-16">
                <div className="font-bold text-2xl">Passages</div>
                {chunks.map((chunk, index) => (
                  <div key={index}>
                    <div className="mt-4 border border-zinc-600 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Image
                            className="rounded-lg"
                            src={getImage(chunk.post_title)}
                            width={103}
                            height={70}
                            alt={chunk.post_title}
                          />
                          <div className="ml-4">
                            <div className="font-bold text-xl">{chunk.post_title}</div>
                            <div className="mt-1 font-bold text-sm">{chunk.post_date}</div>
                          </div>
                        </div>
                        <a
                          className="hover:opacity-50 ml-2"
                          href={chunk.post_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IconExternalLink />
                        </a>
                      </div>
                      <div className="mt-4">{chunk.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 text-center text-lg">{`AI-powered search and chat for DFAT reports`}</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
