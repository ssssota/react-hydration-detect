import { useSyncExternalStore, useRef } from "react";

const noop = () => {};
const isServerEnvironment = () =>
  !(
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );

/**
 * @typedef Props
 * @property {() => any} onHydration
 * @property {() => any} onHydrationComplete
 */

/**
 * Detects if the component is hydrating or has been hydrated
 * @param {Props} props Handlers for hydration and hydration completion
 * @returns {void}
 */
export function useHydrationDetect(props) {
  const onHydrationCalled = useRef(false);
  const onHydrationCompleteCalled = useRef(false);
  useSyncExternalStore(
    noop,
    () => {
      if (onHydrationCompleteCalled.current) return;
      props.onHydrationComplete();
      onHydrationCompleteCalled.current = true;
    },
    () => {
      if (onHydrationCalled.current || isServerEnvironment()) return;
      props.onHydration();
      onHydrationCalled.current = true;
    }
  );
}

export default useHydrationDetect;
