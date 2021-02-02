/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, DependencyList, useRef } from 'react';

interface DebounceOptions {
  delay: number;
}

/**
 * Creates a callback that only executes after a certain interval.
 * @param callback Function to be ran after the interval.
 * @param dependencies Dependency array for the callback.
 * @param options Debounce options like the delay itself.
 */
export function useDebouncedCallback(
  callback: (...args: any[]) => void | Promise<void>,
  dependencies: DependencyList,
  { delay }: DebounceOptions = { delay: 500 },
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const internalCallback = useCallback(
    (...args: any[]) => {
      timeout.current = setTimeout(async () => {
        await callback(...args);
      }, delay);
    },
    [callback, delay, ...dependencies],
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return internalCallback;
}
