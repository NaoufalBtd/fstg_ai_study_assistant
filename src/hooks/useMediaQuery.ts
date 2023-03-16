import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (window) {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const listener = () => {
        setMatches(mediaQuery.matches);
      };

      mediaQuery.addListener(listener);

      return () => {
        mediaQuery.removeListener(listener);
      };
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;
