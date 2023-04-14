import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";
import king from "../public/king.png";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] border-b border-gray-300 py-2 px-4 sm:px-8 items-center justify-center">
      <div className="font-semibold sm:text-2l md:text-2xl flex items-center">
        <div className="ml-2">
            AI-powered Q&A, backed by DFAT reports
        </div>
      </div>
    </div>
  );
};
