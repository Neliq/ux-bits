import React from "react";
import Image from "next/image";

type ImageItem = { src: string; invertable?: boolean };

type HeroProps = {
  images?: Array<string | ImageItem>;
};

const DEFAULT_IMAGES: ImageItem[] = [
  { src: "/Next.js.svg", invertable: true },
  { src: "/Tailwind CSS.svg" },
  { src: "/shadcn-ui-seeklogo.svg", invertable: true },
  { src: "/TypeScript.svg" },
  { src: "/figma-logo-svgrepo-com.svg", invertable: true },
];

const slots = [
  {
    id: 0,
    className: "absolute bottom-0 right-0 z-10 w-[27%] overflow-hidden",
  },
  {
    id: 1,
    className:
      "absolute bottom-0 right-[14%] z-20 w-[32%] overflow-hidden shadow-xl",
  },
  {
    id: 2,
    className:
      "absolute bottom-0 left-1/2 z-30 w-[37%] -translate-x-1/2 overflow-hidden shadow-xl",
  },
  {
    id: 3,
    className:
      "absolute bottom-0 left-[14%] z-20 w-[32%] overflow-hidden shadow-xl",
  },
  { id: 4, className: "absolute bottom-0 left-0 z-10 w-[27%] overflow-hidden" },
];

export default function Hero({ images = DEFAULT_IMAGES }: HeroProps) {
  // Normalize images to array of ImageItem or string
  const imgs = images && images.length ? images : DEFAULT_IMAGES;

  return (
    <div className="container overflow-hidden">
      <div className="relative mx-auto aspect-[2.488709677/1] max-w-[87.5rem]">
        {slots.map((slot) => {
          const raw = imgs[slot.id] ?? imgs[slot.id % imgs.length];
          if (!raw) return null;

          const item: ImageItem =
            typeof raw === "string" ? { src: raw } : (raw as ImageItem);
          const { src, invertable } = item;

          return (
            <div key={slot.id} className={slot.className}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "108.20244332629771%",
                }}
              >
                <div
                  style={{ position: "absolute", inset: 0 }}
                  className="flex items-center justify-center bg-secondary rounded-t-2xl"
                >
                  <Image
                    src={src}
                    alt={`hero-image-${slot.id + 1}`}
                    width={128}
                    height={128}
                    className={`block size-16 sm:size-32 object-center object-cover${
                      invertable ? " dark:invert" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
