`timescale 1ns/1ns

module half_adder (
    input  wire a,
    input  wire b,
    output wire sum,
    output wire carry
);
    assign sum   = a ^ b;
    assign carry = a & b;
endmodule


module full_adder (
    input  wire [2:0] abc_i,
    output wire sum,
    output wire carry
);
    wire sum_0;
    wire carry_0;
    wire carry_1;
    half_adder ha0 (
        .a     (abc_i[0]),
        .b     (abc_i[1]),
        .sum   (sum_0),
        .carry (carry_0)
    );
    half_adder ha1 (
        .a     (sum_0),
        .b     (abc_i[2]),
        .sum   (sum),
        .carry (carry_1)
    );
    assign carry = carry_0 | carry_1;
endmodule
