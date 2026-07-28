#!/usr/bin/env bash
set -e

echo "Compiling..."
iverilog -o sim.out /work/input/*.v

echo "Running simulation..."
vvp sim.out

if [ ! -f out.vcd ]; then
  echo "ERROR: out.vcd not generated"
  exit 1
fi

echo "SUCCESS: out.vcd generated"
