import { useRef } from "react";

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

export default <T>(state: T, compare?: compareFunction<T>): T | undefined => {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  console.log(compare);
  const needUpdate =
    typeof compare === "function" ? compare(curRef.current, state) : true;
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
};
