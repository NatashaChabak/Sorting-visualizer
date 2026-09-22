import "./style.css";
import { createShuffledArray } from "./array";
import { algorithms } from "./algorithms";
import { ALGORITHM_LABELS, type AlgorithmId } from "./types";
import { Visualizer } from "./visualizer";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app not found");

app.innerHTML = `
  <div class="page">
    <header class="hero">
      <p class="eyebrow">Study project</p>
      <h1 class="brand">SortLab</h1>
      <p class="tagline">Watch classic sorting algorithms rearrange values step by step.</p>
    </header>

    <div class="toolbar" role="group" aria-label="Visualizer controls">
      <label class="field">
        <span>Algorithm</span>
        <select id="algorithm"></select>
      </label>

      <label class="field">
        <span>Size <strong id="size-value">40</strong></span>
        <input id="size" type="range" min="10" max="100" value="40" />
      </label>

      <label class="field">
        <span>Speed <strong id="speed-value">50</strong></span>
        <input id="speed" type="range" min="1" max="100" value="50" />
      </label>

      <div class="actions">
        <button id="generate" type="button">Generate</button>
        <button id="sort" type="button" class="primary">Sort</button>
        <button id="reset" type="button">Reset</button>
      </div>
    </div>

    <section class="stage" aria-label="Array visualization">
      <div id="bars" class="bars"></div>
    </section>

    <p class="legend">
      <span><i class="swatch comparing"></i> Comparing</span>
      <span><i class="swatch swapping"></i> Swapping</span>
      <span><i class="swatch sorted"></i> Sorted</span>
    </p>
  </div>
`;

const algorithmSelect = mustGet<HTMLSelectElement>("#algorithm");
const sizeInput = mustGet<HTMLInputElement>("#size");
const speedInput = mustGet<HTMLInputElement>("#speed");
const sizeValue = mustGet<HTMLElement>("#size-value");
const speedValue = mustGet<HTMLElement>("#speed-value");
const generateBtn = mustGet<HTMLButtonElement>("#generate");
const sortBtn = mustGet<HTMLButtonElement>("#sort");
const resetBtn = mustGet<HTMLButtonElement>("#reset");
const barsContainer = mustGet<HTMLElement>("#bars");

for (const [id, label] of Object.entries(ALGORITHM_LABELS)) {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = label;
  algorithmSelect.appendChild(option);
}

const visualizer = new Visualizer({
  container: barsContainer,
  getDelayMs: () => {
    const speed = Number(speedInput.value);
    // Higher speed slider = shorter delay
    return Math.max(5, 220 - speed * 2);
  },
});

let seedArray: number[] = [];

function currentAlgorithm(): AlgorithmId {
  return algorithmSelect.value as AlgorithmId;
}

function setControlsEnabled(enabled: boolean): void {
  algorithmSelect.disabled = !enabled;
  sizeInput.disabled = !enabled;
  generateBtn.disabled = !enabled;
  sortBtn.disabled = !enabled;
}

function generate(): void {
  const size = Number(sizeInput.value);
  seedArray = createShuffledArray(size);
  visualizer.setArray(seedArray);
}

function reset(): void {
  visualizer.cancel();
  visualizer.setArray(seedArray);
  setControlsEnabled(true);
}

async function sort(): Promise<void> {
  if (visualizer.isRunning) return;

  setControlsEnabled(false);
  const algo = algorithms[currentAlgorithm()];
  const steps = algo(visualizer.getArray());
  await visualizer.play(steps);
  setControlsEnabled(true);
}

sizeInput.addEventListener("input", () => {
  sizeValue.textContent = sizeInput.value;
});

speedInput.addEventListener("input", () => {
  speedValue.textContent = speedInput.value;
});

generateBtn.addEventListener("click", generate);
sortBtn.addEventListener("click", () => {
  void sort();
});
resetBtn.addEventListener("click", reset);

generate();

function mustGet<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}
