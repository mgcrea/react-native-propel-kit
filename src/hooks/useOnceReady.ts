import { useEffect, useRef } from "react";

type UseOnceReadyOptions = {
  /** Minimum time in ms since mount before executing (default: 0) */
  minDelay?: number;
};

/**
 * Hook that executes a callback once when `isReady` becomes true.
 * Optionally ensures a minimum time has passed since mount for smoother transitions.
 *
 * @param isReady - Condition that must be true to execute
 * @param callback - Function to execute once ready
 * @param options - Optional configuration (minDelay)
 *
 * @example
 * // Execute immediately when ready
 * useOnceReady(isNavigationReady && !isSessionPending, () => {
 *   navigationRef.dispatch(StackActions.replace("Home"));
 * });
 *
 * @example
 * // Ensure at least 500ms has passed since mount before executing
 * useOnceReady(isNavigationReady && !isSessionPending, () => {
 *   navigationRef.dispatch(StackActions.replace("Home"));
 * }, { minDelay: 500 });
 */
export const useOnceReady = (
  isReady: boolean,
  callback: () => void,
  options: UseOnceReadyOptions = {},
): void => {
  const { minDelay = 0 } = options;
  const hasExecutedRef = useRef(false);
  const mountTimeRef = useRef<number | null>(null);

  // Capture mount time on first render (in effect to satisfy purity rules)
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (hasExecutedRef.current || !isReady) return;

    hasExecutedRef.current = true;

    if (minDelay > 0 && mountTimeRef.current !== null) {
      const elapsed = Date.now() - mountTimeRef.current;
      const remainingDelay = Math.max(0, minDelay - elapsed);

      if (remainingDelay > 0) {
        const timeoutId = setTimeout(callback, remainingDelay);
        return () => clearTimeout(timeoutId);
      }
    }

    callback();
  }, [isReady, callback, minDelay]);
};
