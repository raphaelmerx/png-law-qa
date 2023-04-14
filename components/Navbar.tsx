import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";
import king from "../public/king.png";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] border-b border-gray-300 py-2 px-4 sm:px-8 items-center sm:justify-between justify-center">
      <div className="font-semibold sm:text-2l md:text-2xl flex items-center">
        <div className="ml-2">
            AI-powered Q&A, backed by DFAT reports
        </div>
      </div>
      <div className="flex space-x-4 hidden sm:flex">
        <a
          className="flex items-center hover:opacity-50"
          href="https://twitter.com/raphaelmerx"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter size={24} />
        </a>

        <a
          className="flex items-center hover:opacity-50"
          href="https://github.com/raphaelmerx"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub size={24} />
        </a>
        <a
          className="flex items-center hover:opacity-50"
          href="https://www.linkedin.com/in/raphaelmerx/"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandLinkedin size={24} />
        </a>
        <a
          className="flex items-center hover:opacity-50"
          href="https://www.rapha.dev"
          target="_blank"
          rel="noreferrer"
        >
          <IconExternalLink size={24} />
        </a>
      </div>
    </div>
  );
};
