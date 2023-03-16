import { COURSE_MODULES } from "../constants";
// export const isBreakpointUp = (breakpoint: number | Breakpoint): boolean => {
//   const theme = useTheme();
//   const mediaQuery = window.matchMedia(theme.breakpoints.up(breakpoint));
//   return mediaQuery.matches;
// };

export const getCourseModuleIndexName = (courseModuleName: string) => {
  switch (courseModuleName) {
    case COURSE_MODULES.db:
      return "oracle";
    case COURSE_MODULES.java:
      return "java";
    case COURSE_MODULES.linux:
      return "linux";
    case COURSE_MODULES.networking:
      return "networking";
    case COURSE_MODULES.uml:
      return "uml";
    case COURSE_MODULES.web:
      return "web";
    default:
      throw new Error("Invalid course module name");
  }
};
