// ./registry/lagos/hooks/use-media-query.ts

import { useState, useEffect } from "react";

// Custom hook to detect media query matches
export function useMediaQuery(query: string): boolean {
  // Initialize state to track the current match status of the query
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create a MediaQueryList object
    const mediaQueryList = window.matchMedia(query);

    // Update state with the current match status
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Listen for changes to the media query status
    mediaQueryList.addEventListener("change", documentChangeHandler);

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Cleanup event listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]); // Only re-run the effect if the query changes

  return matches;
}
