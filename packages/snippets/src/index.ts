export * from "./fizzBuzzer";

/**
 * Quasi-random true/false
 */
export const coinFlip = () => {
  let flip = Math.floor(Math.random() * 2);
  return flip === 0 ? false : true;
};

/**
 * Randomly choose a node from a generic array.
 * @param options Array of items
 * @returns option
 */
export function pickFromHat<T>(options: T[]): T {
  let index = Math.floor(Math.random() * options.length);
  return options[index];
}
