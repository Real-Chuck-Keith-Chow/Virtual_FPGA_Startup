
`timescale 1ns/1ps

module counter_tb;
    reg clk = 0;
    reg rst = 1;
    wire [7:0] out;

    counter dut (
        .clk(clk),
        .rst(rst),
        .out(out)
    );

    always #5 clk = ~clk;

    initial begin
        $dumpfile("out.vcd");
        $dumpvars(0, dut);

        #20 rst = 0;
        #200 $finish;
    end
endmodule
