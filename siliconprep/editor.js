// Starter code per language for this problem. In a real build, this (and the
// problem text on the left) would come from your API/database keyed by problem id.
const STARTERS = {
  verilog: `module mux2to1 (
    input  wire sel,
    input  wire a,
    input  wire b,
    output wire y
);

    // TODO: implement y = sel ? b : a

endmodule
`,
  sv: `module mux2to1 (
    input  logic sel,
    input  logic a,
    input  logic b,
    output logic y
);

    // TODO: implement y = sel ? b : a

endmodule
`,
  vhdl: `library ieee;
use ieee.std_logic_1164.all;

entity mux2to1 is
    port (
        sel : in  std_logic;
        a   : in  std_logic;
        b   : in  std_logic;
        y   : out std_logic
    );
end entity;

architecture rtl of mux2to1 is
begin
    -- TODO: implement y = sel ? b : a
end architecture;
`,
};

const MIME = { verilog: "text/x-verilog", sv: "text/x-systemverilog", vhdl: "text/x-vhdl" };
const TOOL = { verilog: "iverilog", sv: "verilator", vhdl: "ghdl" };
const EXT = { verilog: "v", sv: "sv", vhdl: "vhd" };

let currentLang = "verilog";
let editor;

document.addEventListener("DOMContentLoaded", () => {
  editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    value: STARTERS.verilog,
    mode: MIME.verilog,
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    matchBrackets: true,
    viewportMargin: Infinity,
  });
  editor.setValue(STARTERS.verilog);

  document.querySelectorAll(".lang-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".lang-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLang = tab.dataset.lang;
      editor.setOption("mode", MIME[currentLang]);
      editor.setValue(STARTERS[currentLang]);
      resetConsole();
    });
  });

  document.getElementById("run-btn").addEventListener("click", () => simulate(false));
  document.getElementById("submit-btn").addEventListener("click", () => simulate(true));
});

function resetConsole() {
  const badge = document.getElementById("run-status");
  badge.textContent = "Not run yet";
  badge.className = "status-badge";
  document.getElementById("console-body").innerHTML =
    '<span class="muted">Click Run to compile and simulate against the hidden testbench.</span>';
}

// NOTE: this is mock output for scaffolding the UI. Replace with a real call to
// your judge API, which should compile + simulate the submission in a sandboxed
// container and return actual pass/fail results per test vector.
function simulate(isSubmit) {
  const consoleBody = document.getElementById("console-body");
  const badge = document.getElementById("run-status");
  const tool = TOOL[currentLang];

  consoleBody.innerHTML = `<span class="muted">Compiling with ${tool}…</span>`;
  badge.textContent = "Running";
  badge.className = "status-badge";

  setTimeout(() => {
    const lines = [
      `$ ${tool} mux2to1.${EXT[currentLang]} tb_mux2to1.${EXT[currentLang]}`,
      `TESTBENCH: mux2to1`,
      `  t=0   sel=0 a=1 b=0 -&gt; y=1  <span class="ok">[PASS]</span>`,
      `  t=10  sel=1 a=1 b=0 -&gt; y=0  <span class="ok">[PASS]</span>`,
      `  t=20  sel=0 a=0 b=1 -&gt; y=0  <span class="ok">[PASS]</span>`,
      `  t=30  sel=1 a=0 b=1 -&gt; y=1  <span class="ok">[PASS]</span>`,
      `4/4 test vectors passed`,
      ``,
      `<span class="muted">// Mock output — wire this up to a sandboxed ${tool}</span>`,
      `<span class="muted">// backend to replace it with a real simulation.</span>`,
    ];
    consoleBody.innerHTML = lines.join("\n");
    badge.textContent = isSubmit ? "Submission accepted" : "All tests passed";
    badge.className = "status-badge pass";
  }, 650);
}
