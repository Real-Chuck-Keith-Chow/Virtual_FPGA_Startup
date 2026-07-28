# Example Designs

This directory contains **canonical, known-good Verilog designs** used by the Virtual FPGA platform.

These files are **not part of the execution engine**. Instead, they serve as trusted workloads for testing, demos, onboarding, and future challenges.

---

## What this directory is for

### 1. Ground-truth validation

Each example represents a well-understood digital design (counters, FSMs, decoders, etc.).

If these designs do not behave as expected, the issue is in the **platform**, not the design.

They are intentionally simple and boring — that is a feature, not a bug.

---

### 2. Regression testing

As the platform evolves (API changes, visualization layers, interactivity), these examples act as a **manual regression suite**.

You should always be able to:

* Run an example
* Generate a waveform (VCD)
* Observe the same logical behavior over time

If an example breaks, something upstream changed incorrectly.

---

### 3. Phase 2 input source

During Phase 2, example designs are:

* Copied into `/input/` for simulation
* Sent to the `/simulate` API
* Rendered in the waveform viewer

They are the primary development inputs for building and testing the web execution pipeline.

---

### 4. User onboarding & education

These examples will later become:

* Default browser-loaded designs
* Tutorial walkthroughs
* Starter problems for new users

When a user opens the platform, they should see a working example immediately — not a blank editor.

---

## Directory structure

Each example lives in its own folder and typically contains:

* `*.v` — the design module
* `*_tb.v` — a self-contained testbench that:

  * Drives inputs
  * Generates clocks/resets
  * Produces a VCD via `$dumpfile` / `$dumpvars`

Example:

```
counter/
  counter.v
  counter_tb.v
```

The testbench is responsible for waveform generation.

---

## How examples are used today

From the repo root:

1. Copy an example into the input directory:

   ```bash
   cp example/counter/*.v input/
   ```

2. Run the simulator:

   ```bash
   docker run --rm \
     -v "$(pwd)/input:/work/input" \
     -v "$(pwd)/out:/work/output" \
     virtual-fpga-sim
   ```

3. Inspect the generated `out.vcd` waveform.

---

## How examples will be used later

In future phases, these examples will:

* Be selectable in the browser
* Auto-load into the editor
* Drive challenges and expected behaviors
* Serve as reference designs for virtual FPGA + circuit views

They are long-lived assets.

---

## What this directory is NOT

* Not required by the runner
* Not baked into the Docker image
* Not vendor-specific
* Not exhaustive or optimized

These are **reference workloads**, not production IP.

---

## Adding a new example

When adding a new example:

* Keep it simple
* Include a self-contained testbench
* Ensure it produces a deterministic VCD
* Prefer clarity over cleverness

If it would appear in a digital design textbook, it belongs here.
