import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "../Navbar/logo";

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Collection",
    href: "/collection",
  },
];

export const Footer = () => {
  return (
    <footer className="border-t mt-32">
      <div className="max-w-(--breakpoint-xl) mx-auto">
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
          <div>
            <Logo />

            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          {/* <div className="max-w-xs w-full">
            <h6 className="font-medium">Stay up to date</h6>
            <form className="mt-6 flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </form>
          </div> */}
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              UX Bits
            </Link>
            . All rights reserved. |{" "}
            <Link
              href="https://koszyka.com"
              className="text-foreground hover:text-primary"
            >
              by Jakub Koszyka
            </Link>
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link
              href="https://www.linkedin.com/in/jakubkoszyka/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/Neliq/ux-bits"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
