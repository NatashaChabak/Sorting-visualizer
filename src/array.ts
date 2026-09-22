/** Create an array of values 1..size in random order (unique heights). */
export function createShuffledArray(size: number): number[] {
  const values = Array.from({ length: size }, (_, i) => i + 1);
  shuffleInPlace(values);
  return values;
}

export function shuffleInPlace(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}
