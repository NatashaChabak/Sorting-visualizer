export type AlgorithmId =
  | "bubble"
  | "insertion"
  | "selection"
  | "merge"
  | "quick";

export type SortStep = {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
};

export type SortAlgorithm = (array: number[]) => SortStep[];

export const ALGORITHM_LABELS: Record<AlgorithmId, string> = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  selection: "Selection Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
};
