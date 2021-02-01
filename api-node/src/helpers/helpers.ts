import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const generateUrl = (): string => {
  const randomUrl: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "",
    style: "capital",
  });

  return randomUrl;
};
