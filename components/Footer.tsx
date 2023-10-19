import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center justify-center hidden sm:flex">
      <div className="italic text-sm">
        All data sourced from
        <a
          className="hover:opacity-50 mx-1"
          href="https://femilipng.org/wp-content/uploads/Family-Protection-Act-2013.pdf"
          target="_blank"
          rel="noreferrer"
        >
          the Family Protection Act 2013 (amended 2022)
        </a>
        and 
        <a
          className="hover:opacity-50 mx-1"
          href="https://femilipng.org/wp-content/uploads/Family-Protection-Regulation-2017.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Family Protection Regulation 2017
        </a>
        .
      </div>
    </div>
  );
};
