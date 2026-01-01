`timescale 1ns/1ns

module full_adder_tb;
    reg  [2:0] abc_i;
    wire sum;
    wire carry;
    full_adder dut (
        .abc_i(abc_i),
        .sum  (sum),
        .carry(carry)
    );
    initial begin
        $dumpfile("full_adder.vcd");
        $dumpvars(0, full_adder_tb);
        
        abc_i = 3'b000; #10;
        abc_i = 3'b001; #10;
        abc_i = 3'b010; #10;
        abc_i = 3'b011; #10;
        abc_i = 3'b100; #10;
        abc_i = 3'b101; #10;
        abc_i = 3'b110; #10;
        abc_i = 3'b111; #10;

        $finish;
    end
endmodule
