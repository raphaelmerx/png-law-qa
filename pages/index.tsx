import { Answer } from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { DocumentChunk } from "@/types";
import { getImage } from "@/utils/images";
import { IconArrowRight, IconExternalLink, IconSearch } from "@tabler/icons-react";
import endent from "endent";
import Head from "next/head";
import Image from "next/image";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import LogRocket from 'logrocket';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (process.env.NODE_ENV === 'production') LogRocket.init('jymlud/chat-langchain-dfat');


function ExampleChip({ text, onClick }: { text: string; onClick: (text: string) => void}) {

    const handleClick = () => {
        onClick(text);
    }

    return (
        <div
          className="inline-flex items-center px-3 py-1 mt-3 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          onClick={handleClick}>
          {text}
        </div>
    )
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<DocumentChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(true);

  const [matchCount, setMatchCount] = useState<number>(5);

  const onClickChip = (text: string) => {
    setQuery(text);
    handleAnswer(text);
  }

  const handleAnswer = async (text: string) => {
    if (!text) {
      alert('Please enter a query.');
      return;
    }
    if (loading) { return; }
  
    setShowExamples(false)
    setAnswer('');
    setChunks([]);
  
    setLoading(true);
  
    // Create a WebSocket connection to the '/chat' endpoint
    const socket = new WebSocket(`${BACKEND_URL}/chat-ndoh`);
  
    // Set up the WebSocket event listeners
    socket.onopen = (event) => {
      // Send the query once the WebSocket connection is open
      socket.send(text);
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
      }
      if (data.type && data.type === 'sources') {
        setChunks(data.sources)
        socket.close();
      }
    };
  
    socket.onerror = (error) => {
      setLoading(false);
      console.error('WebSocket error:', error);
      alert('An error occurred while trying to connect to the server. Please try again later.');
    };
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnswer(query);
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
        <title>NHSS Q&A</title>
        <meta
          name="description"
          content={`AI-powered answers on the PNG National Health Service Standards`}
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
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4">
              <div className="relative w-full mt-4">
                <IconSearch className="absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

                <input
                  ref={inputRef}
                  className="h-12 w-full rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
                  type="text"
                  placeholder="What are the different categories of health facilities?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button>
                  <IconArrowRight
                    onClick={() => handleAnswer(query)}
                    className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                  />
                </button>
              </div>

            {showExamples && (
                <div className="w-full">
                    <ExampleChip text="What is the process for referral?" onClick={onClickChip} />
                    <ExampleChip text="What are the monthly reporting requirements for health centres?" onClick={onClickChip} />
                </div>
            )}
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
                    <div className="font-bold text-2xl mt-6">Sources</div>
                    <div className="animate-pulse mt-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </>) : ''}
              </div>
            ) : (
              <div className="mt-6 w-full">
                {answer.length ? (<div className="font-bold text-2xl mb-2">Answer</div>) : ''}
                <Answer text={answer} />

                <div className="mt-6 mb-16">
                {chunks.length ? (<div className="font-bold text-2xl">Sources</div>) : ''}

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <div className="mt-4 border border-zinc-600 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-xl">{chunk.title}</div>
                            </div>
                          </div>
                          {chunk.url && (
                            <a
                                className="hover:opacity-50 ml-4"
                                href={chunk.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <IconExternalLink />
                            </a>
                          )}
                        </div>
                        <div className="mt-4">{chunk.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
