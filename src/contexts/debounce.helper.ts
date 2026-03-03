/**
 * @group Utility
 * This file provides a generic debounce utility.
 */

/**
 * Creates a debounced function that delays invoking `func` until after `waitFor`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce.
 * @param waitFor - The number of milliseconds to delay.
 * @returns A new, debounced function.
 */
export const debounce = <A extends unknown[], R>(
  func: (...args: A) => R,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;

  return (...args: A): Promise<R> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
