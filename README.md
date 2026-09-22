# SortLab — Sorting Visualizer

TypeScript study project: watch sorting algorithms rearrange an array as animated bars.

## Run

```bash
cd sorting-visualizer
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Controls

| Control | What it does |
|---------|----------------|
| Algorithm | Bubble, Insertion, Selection, Merge, Quick |
| Size | Number of bars (10–100) |
| Speed | Animation speed (higher = faster) |
| Generate | New random array |
| Sort | Run the selected algorithm |
| Reset | Cancel the run and restore the last generated array |

## Colors

- Yellow — comparing
- Red — swapping / writing
- Teal — marked sorted

## Architecture (study notes)

1. Each algorithm returns `SortStep[]` (snapshots), not live DOM updates.
2. `Visualizer.play()` walks those steps with a delay from the speed slider.
3. UI stays thin: `main.ts` wires controls; algorithms stay pure functions.

```ts
type SortStep = {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
};
```

## Big-O cheat sheet

| Algorithm | Average time | Extra space | Notes |
|-----------|--------------|-------------|-------|
| Bubble | O(n²) | O(1) | Adjacent swaps; easy to visualize |
| Insertion | O(n²) | O(1) | Fast on nearly sorted data |
| Selection | O(n²) | O(1) | Few swaps; always ~n² compares |
| Merge | O(n log n) | O(n) | Stable; divide and conquer |
| Quick | O(n log n) avg | O(log n) | Pivot partition; worst O(n²) |

## What to practice

1. Trace Bubble steps in the debugger after a short run.
2. Sketch Merge/Quick on paper, then match the highlights on screen.
3. Fix size and speed, then compare how “busy” each algorithm looks.
