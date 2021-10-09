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


type FBInterval = [number, string];
type FBReturn = string | [number,string]
interface fbArgs {
  length: number,
  intervals?: FBInterval[],
  valuesOnly?: boolean
}

const defaultIntervals:FBInterval[] = [
  [3, "fizz"],
  [5, "buzz"],
]

export function fizzBuzzer({intervals = defaultIntervals, length, valuesOnly}:fbArgs): FBReturn[] {
  // create an array equal to length argument, indexed at 1
  const entries = Array.from(new Array(length + 1)).slice(1)
  // return a fizzbuzz entry as a string, or [number, string] tuple if valuesOnly is true
  const makeEntry = (_: unknown, i: number): string|[number, string] => {
     const str = intervals.map(([idx, val]) => (i+1) % idx === 0 ? val : '').join('');
     return valuesOnly ? str : [i+1, str];
  }
  // Run makeEntry for each entry on the map, returning the result
  return entries.map(makeEntry)
}

export default fizzBuzzer;


export function fizzBuzzSingleton({intervals = defaultIntervals, length}: fbArgs): String[] {
  let arr = Array.from(new Array(length))
  return arr.map((_, i) => intervals.map(([idx, val]) => ((i+1) % idx === 0) ? val : '').join(''));
}
