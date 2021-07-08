import { useEffect, useState } from "react";

const threshold = 0;
const root = null;
const rootMargin = '0%';
const freezeOnceVisible = true;

export default function useIntersectionObserver(elementRef) {
  const [entry, setEntry] = useState();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => setEntry(entry);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}