import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const useScreenBreakpoint = (): string | null => {
  const theme = useTheme();
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const breakpoints = theme.breakpoints.keys.reverse();
      const currentBreakpoint = breakpoints.reduce<string | null>(
        (result, breakpoint) => {
          if (window.matchMedia(theme.breakpoints.up(breakpoint)).matches) {
            return breakpoint;
          }
          return result;
        },
        null
      );
      setBreakpoint(currentBreakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints]);

  return breakpoint;
};

export default useScreenBreakpoint;
