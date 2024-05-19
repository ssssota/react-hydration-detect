'use client';
import useHydrationDetect from "react-hydration-detect";

export default function Home() {
  useHydrationDetect({
    onHydration: () => {
      console.log("Hydrating...");
    },
    onHydrationComplete: () => {
      console.log("Hydrated!");
    }
  });
  return <h1>Hello, World!</h1>;
}
