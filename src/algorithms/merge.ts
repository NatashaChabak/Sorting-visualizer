import type { SortStep } from "../types";

export function mergeSort(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const sorted = new Set<number>();

  function merge(left: number, mid: number, right: number): void {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        sorted: [...sorted],
      });

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }

      steps.push({
        array: [...arr],
        swapping: [k, k],
        sorted: [...sorted],
      });
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      steps.push({
        array: [...arr],
        swapping: [k, k],
        sorted: [...sorted],
      });
      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      steps.push({
        array: [...arr],
        swapping: [k, k],
        sorted: [...sorted],
      });
      j++;
      k++;
    }

    if (left === 0 && right === arr.length - 1) {
      for (let idx = left; idx <= right; idx++) sorted.add(idx);
    }
  }

  function sort(left: number, right: number): void {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  sort(0, arr.length - 1);
  steps.push({
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  });
  return steps;
}
