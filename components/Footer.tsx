import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://twitter.com/raphaelmerx"
          target="_blank"
          rel="noreferrer"
        >
          Raphaël Merx
        </a>
        based on 
        <a
          className="hover:opacity-50 ml-1"
          href="https://github.com/mckaywrigley/wait-but-why-gpt"
          target="_blank"
          rel="noreferrer"
        >
          Wait but Why GPT
        </a>
        .
      </div>

      <div className="flex space-x-4">
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
