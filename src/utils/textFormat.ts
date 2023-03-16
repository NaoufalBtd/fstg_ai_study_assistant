export const capitalize = (str: string) => {
  if (!str) {
    return str;
  }

  return str
    .split(" ")
    .map((word) => {
      if (!word) {
        return word;
      }
      const firstChar = word.charAt(0);
      return firstChar.toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const shortenString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    // If the string is already short enough, return it as-is
    return str;
  }

  // Shorten the string to the maximum length, minus 3 for the dots
  const shortened = str.substr(0, maxLength - 3);

  // Add the dots to the end of the shortened string
  return `${shortened}...`;
};
