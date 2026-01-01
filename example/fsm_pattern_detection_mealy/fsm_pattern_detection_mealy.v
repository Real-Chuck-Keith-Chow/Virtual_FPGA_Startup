`timescale 1ns/1ns
module fsm_pattern_detection_mealy (
    input wire clk,
    input wire rst,
    input wire in_i,
    output reg detect
);

    parameter S0 = 2'b00;
    parameter S1 = 2'b01;
    parameter S2 = 2'b10;

    reg [1:0] currState;

    always @(posedge clk) begin
        if (rst) begin
            currState <= S0; 
        end else begin
            case (currState)
                S0: currState <= (in_i) ? S1 : S0;
                S1: currState <= (in_i) ? S2 : S0;
                S2: currState <= (in_i) ? S2 : S0;
                default: currState <= S0;
            endcase
        end
    end

    always @(*) begin
        if (currState == S2 && in_i == 1'b1)
            detect = 1'b1;
        else
            detect = 1'b0;
    end

endmodule
