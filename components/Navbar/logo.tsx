import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center space-x-2">
    <Image
      src="/favicon.svg"
      alt="Logo"
      className="invert dark:invert-0"
      width={32}
      height={32}
      priority
    />
    <span className="font-semibold text-lg">UXBits</span>
  </Link>
);
