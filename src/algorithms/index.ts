import type { AlgorithmId, SortAlgorithm } from "../types";
import { bubbleSort } from "./bubble";
import { insertionSort } from "./insertion";
import { selectionSort } from "./selection";
import { mergeSort } from "./merge";
import { quickSort } from "./quick";

export const algorithms: Record<AlgorithmId, SortAlgorithm> = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  merge: mergeSort,
  quick: quickSort,
};
