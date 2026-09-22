import type { SortStep } from "../types";

export function selectionSort(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        sorted: [...sorted],
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
      steps.push({
        array: [...arr],
        swapping: [i, minIndex],
        sorted: [...sorted],
      });
    }

    sorted.push(i);
  }

  sorted.push(n - 1);
  steps.push({ array: [...arr], sorted: [...sorted] });
  return steps;
}
