# Virtual_FPGA_Startup

Core thesis: Modern hardware development should feel like modern software development. We’re building a cloud-based Verilog simulation and visualization platform, not an FPGA toolchain.


1️⃣ Locked Scope (NON-NEGOTIABLE)
❌ We are NOT building

❌ FPGA synthesis (no place & route)

❌ Vendor tools (no Xilinx / Intel / proprietary IP)

❌ Custom Verilog compiler or interpreter

❌ Cycle-accurate silicon / transistor models

❌ Production-grade EDA replacement (yet)

✅ We ARE building

✅ Cloud-based Verilog simulation

✅ Visualization of signal behavior

✅ Browser-based dev environment

✅ Virtual lab experience (educational + dev-focused)


2️⃣ Technology Stack (DECIDED)
Simulation

Simulator: iverilog (Phase 1)

Output format: VCD (Value Change Dump)

Execution: Event-driven simulation (existing tools)

Backend

Language: Node.js or Python (keep simple)

Sandbox: Docker (one container per run)

API: REST (POST /simulate)

Security: no network, time + memory limits

Frontend

Editor: Monaco (VS Code–like)

Visualization:

Phase 1: waveform viewer (2D)

Phase 2+: circuit / FPGA visualization

Framework: React (or similar)

Cloud (later)

Infra: single Linux VM

Deploy: Docker Compose

HTTPS: Caddy / Nginx

3️⃣ Prototype Definition (VERY IMPORTANT)
Phase 1 Prototype = SUCCESS if:

User pastes Verilog + testbench

Clicks Run

Simulation executes in cloud

Waveforms appear in browser

Errors are shown clearly

❌ No live interaction
❌ No FPGA animation
❌ No 3D

4️⃣ Roles (FOR NOW)
Founder / Product / Backend 

API

Docker runner

Cloud deployment

Product decisions

UX flow

Simulation / HDL Contributor

Verilog examples

Testbenches

Validate simulation behavior


⚠️ No hiring yet — contributors only.
