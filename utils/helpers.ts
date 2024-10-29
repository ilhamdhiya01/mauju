import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const parseErrorString = (
  input: string
): { message: string; errorId: string | undefined } => {
  const messageMatch = input.match(/^(.*)\s\[ID\]:/);
  const errorIdMatch = input.match(/\[ID\]:\s(.+)$/);

  if (messageMatch && errorIdMatch) {
    const message = messageMatch[1];
    const errorId = errorIdMatch[1];
    return { message, errorId };
  }

  return { message: input, errorId: undefined };
};

export const replaceString = (str: string, mapObj: any) => {
  if (!str) {
    return str;
  }
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  return str.replace(re, (matched: string) => mapObj[matched]);
};
