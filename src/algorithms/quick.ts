import type { SortStep } from "../types";

export function quickSort(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const sorted = new Set<number>();

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        sorted: [...sorted],
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
          steps.push({
            array: [...arr],
            swapping: [i, j],
            sorted: [...sorted],
          });
        }
      }
    }

    const pivotIndex = i + 1;
    if (pivotIndex !== high) {
      const tmp = arr[pivotIndex];
      arr[pivotIndex] = arr[high];
      arr[high] = tmp;
      steps.push({
        array: [...arr],
        swapping: [pivotIndex, high],
        sorted: [...sorted],
      });
    }

    sorted.add(pivotIndex);
    return pivotIndex;
  }

  function sort(low: number, high: number): void {
    if (low > high) return;
    if (low === high) {
      sorted.add(low);
      steps.push({ array: [...arr], sorted: [...sorted] });
      return;
    }

    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, arr.length - 1);
  steps.push({
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  });
  return steps;
}
