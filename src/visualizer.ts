import type { SortStep } from "./types";

export type VisualizerOptions = {
  container: HTMLElement;
  getDelayMs: () => number;
};

export class Visualizer {
  private container: HTMLElement;
  private getDelayMs: () => number;
  private running = false;
  private cancelRequested = false;
  private array: number[] = [];

  constructor(options: VisualizerOptions) {
    this.container = options.container;
    this.getDelayMs = options.getDelayMs;
  }

  get isRunning(): boolean {
    return this.running;
  }

  setArray(array: number[]): void {
    this.cancel();
    this.array = [...array];
    this.renderBars(this.array);
  }

  getArray(): number[] {
    return [...this.array];
  }

  cancel(): void {
    this.cancelRequested = true;
  }

  async play(steps: SortStep[]): Promise<boolean> {
    if (this.running) return false;

    this.running = true;
    this.cancelRequested = false;

    for (const step of steps) {
      if (this.cancelRequested) {
        this.running = false;
        this.renderBars(this.array);
        return false;
      }

      this.array = [...step.array];
      this.renderBars(step.array, step);
      await sleep(this.getDelayMs());
    }

    this.running = false;
    return true;
  }

  private renderBars(array: number[], step?: SortStep): void {
    const max = Math.max(...array, 1);
    this.container.replaceChildren();

    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${(value / max) * 100}%`;
      bar.title = String(value);

      if (step?.comparing?.includes(index)) bar.classList.add("comparing");
      if (step?.swapping?.includes(index)) bar.classList.add("swapping");
      if (step?.sorted?.includes(index)) bar.classList.add("sorted");

      this.container.appendChild(bar);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
