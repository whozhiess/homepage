"use client";
import Image from "next/image";
import { useRef, useLayoutEffect, useState, useEffect } from "react";

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [btnWidth, setBtnWidth] = useState<number>();
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const buttons = [
    { name: "telegram", href: "https://t.me/deshitpostbil" },
    { name: "instagram", href: "https://www.instagram.com/saihotape" },
    { name: "soundcloud", href: "https://soundcloud.com/saihotape" },
    { name: "steam", href: "https://steamcommunity.com/id/kwxqq" },
    { name: "twitch", href: "https://www.twitch.tv/syringeandvein" },
    { name: "youtube", href: "https://www.youtube.com/channel/UCNtLh45CMH2GWdcjbVH-y5g" },
    { name: "github", href: "https://github.com/whozhiess" },
  ];

  useLayoutEffect(() => {
    if (headingRef.current) {
      setBtnWidth(headingRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setScrollCount((prev) => {
          if (prev === 0) {
            setShowSidebar(true);
            document.body.classList.add("svg-faded");
            return 1;
          } else {
            setShowSidebar(false);
            document.body.classList.remove("svg-faded");
            return 0;
          }
        });
      }, 100);
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
      </main>
      <div
        className={`button-sidebar ${showSidebar ? "button-sidebar--open" : ""}`}
        style={{ width: btnWidth ? btnWidth + 16 : undefined }}
      >
        <h1 ref={headingRef} className="font-black text-6xl">whozhiess</h1>
        <div className="button-sidebar-inner">
          {buttons.map((button) => (
            <a
              key={button.name}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-[13px] rounded-md block text-center font-bold"
              style={btnWidth ? { width: btnWidth } : {}}
            >
              {button.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
