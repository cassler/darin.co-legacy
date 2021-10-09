/**
 * Flexible FizzBuzz Solution
 *
 * @param count - How many iterations to run.
 * @param intervals - Array of tuple representing intervals e.g. [[3, 'fizz], [5, 'buzz]]
 *
 * @example fizzBuzzer(100, [[3, 'fizz],[5, 'buzz]]) P
 * @yields ['','','fizz','','buzz','fizz','', ...]
 *
 * @return String[]
 */

export type FBInterval = [number, string];
interface fbArgs {
  length: number,
  intervals?: FBInterval[]
}
const defaultArgs: FBInterval[] = [
  [3, "fizz"],
  [5, "buzz"],
];
export function fizzBuzzer({intervals = defaultArgs, length}: fbArgs): String[] {
  return Array.from(new Array(length)).map((u, i) => {
    let str = "";
    intervals.map((inter) => {
      if (i % inter[0] === 0) str += inter[1];
    });
    return str;
  });
}

export default fizzBuzzer;
