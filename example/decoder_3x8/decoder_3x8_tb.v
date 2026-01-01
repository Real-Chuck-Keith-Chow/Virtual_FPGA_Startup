`timescale 1ns / 1ps

module decoder_3x8_tb;
    reg       enable;
    reg [2:0] in_i;
    wire [7:0] out_o;
    integer i;
	 
    decoder_3x8 dut (
        .enable(enable), 
        .in_i(in_i), 
        .out_o(out_o)
    );

    initial begin
        $monitor("Time=%0t | Enable=%b | Input=%b (%d) | Output=%b", 
                 $time, enable, in_i, in_i, out_o);

        enable = 0;
        in_i   = 3'b101;
        #10;

        enable = 1;
        
        for (i = 0; i < 8; i = i + 1) begin
            in_i = i[2:0];
            #10;
        end

        $finish;
    end
endmodule
