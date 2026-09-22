import type { SortStep } from "../types";

export function insertionSort(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      steps.push({
        array: [...arr],
        comparing: [j - 1, j],
        sorted: Array.from({ length: i }, (_, k) => k),
      });

      if (arr[j - 1] <= arr[j]) break;

      const tmp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = tmp;
      steps.push({
        array: [...arr],
        swapping: [j - 1, j],
        sorted: Array.from({ length: i }, (_, k) => k),
      });
      j--;
    }
  }

  steps.push({
    array: [...arr],
    sorted: Array.from({ length: n }, (_, k) => k),
  });
  return steps;
}
