import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

import React from "react";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Youtube",
    href: "http://www.youtube.com",
    icon: <Youtube className="w-5 h-5" />,
  },

  {
    title: "GitHub",
    href: "http://www.gitHub.com",
    icon: <Github className="w-5 h-5" />,
  },

  {
    title: "Facebook",
    href: "http://www.Facebook.com",
    icon: <Facebook className="w-5 h-5" />,
  },

  {
    title: "LinkedIn",
    href: "http://www.LinkdIn.com",
    icon: <Linkedin className="w-5 h-5" />,
  },

  {
    title: "Slack",
    href: "http://www.Slack.com",
    icon: <Slack className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex ietms-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-white",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-black font-semibold text-xs p-2 rounded-2xl",
                tooltipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
