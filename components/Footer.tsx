import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center justify-center hidden sm:flex">
      <div className="italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://www.rapha.dev"
          target="_blank"
          rel="noreferrer"
        >
          Raphaël Merx
        </a>
        using
        <a
          className="hover:opacity-50 mx-1"
          href="https://www.dfat.gov.au"
          target="_blank"
          rel="noreferrer"
        >
          dfat.gov.au
        </a>
        data. Based on 
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

    </div>
  );
};
