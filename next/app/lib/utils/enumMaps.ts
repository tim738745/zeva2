// currently, a prisma object {key -> value} generated from a schema enum is
// such that key = value, regardless of the usage of the @map attribute;
// please see: https://github.com/prisma/prisma/issues/8446.
// to overcome this issue, we can use the maps below; not great from a maintenance perspective,
// so hopefully prisma addresses this soon!

import { Role } from "@/prisma/generated/client";

export const lowerCaseAndCapitalize = (s: string) => {
  const firstLetter = s.charAt(0);
  const lowerCasedTail = s.toLowerCase().slice(1);
  return firstLetter + lowerCasedTail;
};

export const statusTransformer = (s: string) => {
  const splitString = s.split("_");
  const transformed = splitString.map((t) => {
    return lowerCaseAndCapitalize(t);
  });
  return transformed.join(" ");
};

export const modelYearsTransformer = (s: string) => {
  return s.split("_")[1];
};

export const zevClassTransformer = (s: string) => {
  if (s.length > 1) {
    return lowerCaseAndCapitalize(s);
  }
  return s;
};

export const idpTransformer = (s: string) => {
  return s.toLowerCase().replaceAll("_", "");
};

export const roleTransformer = (s: string) => {
  if (s === Role.ENGINEER_ANALYST) {
    return "Engineer/Analyst";
  } else if (s === Role.ZEVA_USER) {
    return "ZEVA User";
  }
  return statusTransformer(s);
};

export const getStringsToEnumsMap = <E extends string>(
  enumInQuestion: Record<string, E>,
  transformer: (s: string) => string,
) => {
  const result: Partial<Record<string, E>> = {};
  for (const value of Object.values(enumInQuestion)) {
    result[transformer(value)] = value;
  }
  return result;
};

export const getEnumsToStringsMap = <E extends string>(
  enumInQuestion: Record<string, E>,
  transformer: (s: string) => string,
) => {
  const result: Partial<Record<E, string>> = {};
  for (const value of Object.values(enumInQuestion)) {
    result[value] = transformer(value);
  }
  return result;
};
