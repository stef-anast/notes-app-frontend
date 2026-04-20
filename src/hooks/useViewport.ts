import { useEffect, useState } from "react";

export function useViewport() {
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    windowWidth,
    isSmallScreenSize: windowWidth > 0 && windowWidth < 480,
    isMediumScreenSize: windowWidth >= 480 && windowWidth < 768,
  };
}
