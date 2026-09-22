import type { SortStep } from "../types";

export function bubbleSort(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: [...sorted],
      });

      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        steps.push({
          array: [...arr],
          swapping: [j, j + 1],
          sorted: [...sorted],
        });
      }
    }
    sorted.push(n - 1 - i);
  }

  sorted.push(0);
  steps.push({ array: [...arr], sorted: [...sorted] });
  return steps;
}
