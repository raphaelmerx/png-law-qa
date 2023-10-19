import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";
import king from "../public/king.png";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] border-b border-gray-300 py-2 px-4 sm:px-8 items-center sm:justify-between justify-center">
      <div className="font-semibold sm:text-2l md:text-2xl flex items-center">
        <div className="ml-2">
            AI-powered answers on Family Law in PNG
        </div>
      </div>
      <div className="flex space-x-4 hidden sm:flex">
        <a
          className="flex items-center hover:opacity-50"
          href="https://www.rapha.dev/blog/dfat-qa"
          target="_blank"
          rel="noreferrer"
        >
          <IconExternalLink size={24} />
        </a>
      </div>
    </div>
  );
};
