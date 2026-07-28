// Mock problem catalogue. Swap this for a real API call once you have a backend.
const PROBLEMS = [
  { id: 1, title: "2-to-1 Multiplexer", topic: "Combinational", difficulty: "easy", langs: ["verilog", "sv", "vhdl"], rate: 91 },
  { id: 2, title: "4-bit Priority Encoder", topic: "Combinational", difficulty: "easy", langs: ["verilog", "sv"], rate: 84 },
  { id: 3, title: "BCD to 7-Segment Decoder", topic: "Combinational", difficulty: "easy", langs: ["verilog", "sv", "vhdl"], rate: 79 },
  { id: 4, title: "Ripple Carry Adder", topic: "Arithmetic", difficulty: "easy", langs: ["verilog", "vhdl"], rate: 88 },
  { id: 5, title: "8-bit ALU", topic: "Arithmetic", difficulty: "medium", langs: ["verilog", "sv"], rate: 61 },
  { id: 6, title: "Booth Multiplier", topic: "Arithmetic", difficulty: "hard", langs: ["verilog", "sv"], rate: 34 },
  { id: 7, title: "D Flip-Flop with Async Reset", topic: "Sequential", difficulty: "easy", langs: ["verilog", "sv", "vhdl"], rate: 93 },
  { id: 8, title: "Traffic Light FSM", topic: "FSM", difficulty: "medium", langs: ["verilog", "sv", "vhdl"], rate: 58 },
  { id: 9, title: "Vending Machine FSM", topic: "FSM", difficulty: "medium", langs: ["sv", "vhdl"], rate: 52 },
  { id: 10, title: "Sequence Detector (1011)", topic: "FSM", difficulty: "medium", langs: ["verilog", "sv"], rate: 55 },
  { id: 11, title: "Synchronous FIFO", topic: "Memory", difficulty: "medium", langs: ["verilog", "sv"], rate: 47 },
  { id: 12, title: "Asynchronous FIFO (Gray Code)", topic: "CDC", difficulty: "hard", langs: ["sv", "vhdl"], rate: 21 },
  { id: 13, title: "Dual-Port RAM", topic: "Memory", difficulty: "medium", langs: ["verilog", "vhdl"], rate: 63 },
  { id: 14, title: "LRU Cache Controller", topic: "Memory", difficulty: "hard", langs: ["sv"], rate: 24 },
  { id: 15, title: "Two-Flop Synchronizer", topic: "CDC", difficulty: "easy", langs: ["verilog", "sv", "vhdl"], rate: 76 },
  { id: 16, title: "UART Transmitter", topic: "Protocols", difficulty: "medium", langs: ["verilog", "sv", "vhdl"], rate: 49 },
  { id: 17, title: "SPI Master Controller", topic: "Protocols", difficulty: "medium", langs: ["verilog", "sv"], rate: 44 },
  { id: 18, title: "I2C Slave Interface", topic: "Protocols", difficulty: "hard", langs: ["sv", "vhdl"], rate: 27 },
  { id: 19, title: "AXI-Lite Read Channel", topic: "Protocols", difficulty: "hard", langs: ["sv"], rate: 22 },
  { id: 20, title: "Assertion: One-Hot Checker (SVA)", topic: "Verification", difficulty: "medium", langs: ["sv"], rate: 41 },
  { id: 21, title: "Self-Checking Testbench Basics", topic: "Verification", difficulty: "easy", langs: ["sv", "vhdl"], rate: 71 },
  { id: 22, title: "Debounce Circuit", topic: "Sequential", difficulty: "easy", langs: ["verilog", "vhdl"], rate: 82 },
  { id: 23, title: "Register File (2R1W)", topic: "Memory", difficulty: "medium", langs: ["verilog", "sv"], rate: 56 },
  { id: 24, title: "Clock Divider (Odd Ratio)", topic: "Sequential", difficulty: "medium", langs: ["verilog", "vhdl"], rate: 53 },
];

const LANG_LABEL = { verilog: "Verilog", sv: "SystemVerilog", vhdl: "VHDL" };
