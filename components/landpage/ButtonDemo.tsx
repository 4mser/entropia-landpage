"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

function ButtonDemo() {
  return (
    <Link
      href="/dash/explore"
      target="_blank"
      className="p-px mt-5 absolute -bottom-16 left-1/2 -translate-x-1/2  overflow-hidden  w-fit  group rounded-full transition duration-100 shadow-custom2 lg:shadow-custom3 lg:hover:shadow-custom2 xl:-bottom-20"
      style={{
        background: "var(--degree)",
        animation: "gradient 7s ease infinite",
        backgroundSize: "200% 30%",
      }}
    >
      <p className="bg-custom-btn lg:bg-custom-bg text-stone-200 w-full h-full rounded-full text-xl font-light hover:bg-custom-btn transition duration-300  py-1 px-7 flex flex-row whitespace-nowrap items-center gap-2 group-hover:text-white   xl:py-2.5 xl:px-9 ">
        Conoce más
        <Icon
          icon="solar:arrow-up-linear"
          rotate={1}
          className="scale-110  transition-transform group-hover:translate-x-[7px] "
        />
      </p>
    </Link>
  );
}

export default ButtonDemo;
