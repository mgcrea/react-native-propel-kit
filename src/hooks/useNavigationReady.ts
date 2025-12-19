import { useCallback, useState } from "react";

/**
 * Hook to track when navigation is ready.
 * Returns state and a callback to pass to Navigation's onReady prop.
 *
 * @example
 * const { isNavigationReady, onNavigationReady } = useNavigationReady();
 *
 * useEffect(() => {
 *   if (!isNavigationReady) return;
 *   // Navigation is ready, safe to dispatch actions
 * }, [isNavigationReady]);
 *
 * return <Navigation onReady={onNavigationReady} />;
 */
export const useNavigationReady = () => {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const onNavigationReady = useCallback(() => {
    setIsNavigationReady(true);
  }, []);

  return { isNavigationReady, onNavigationReady };
};
