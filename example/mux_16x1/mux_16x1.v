`timescale 1ns/1ns

module mux_4x1 (
    input  wire [3:0] in_i,
    input  wire [1:0] sel,
    output wire       out_o
);   
    assign out_o = (sel == 2'b00) ? in_i[0] :
                   (sel == 2'b01) ? in_i[1] :
                   (sel == 2'b10) ? in_i[2] : in_i[3];
endmodule

module mux_8x1 (
    input  wire [2:0] sel,
    input  wire [7:0] in_i,
    output reg        out_o
);
    always @(*) begin
        case (sel) 
            3'b000: out_o = in_i[0];
            3'b001: out_o = in_i[1];
            3'b010: out_o = in_i[2];
            3'b011: out_o = in_i[3];
            3'b100: out_o = in_i[4];
            3'b101: out_o = in_i[5];
            3'b110: out_o = in_i[6];
            3'b111: out_o = in_i[7];
            default: out_o = 1'b0;
        endcase
    end
endmodule

module mux_16x1 (
    input  wire [15:0] inp_i,
    input  wire [3:0]  sel,
    output wire        out_o
);
    wire m0_out;
    wire m1_out;
    wire m2_out;

    mux_4x1 m0 (
        .in_i(inp_i[3:0]),
        .sel(sel[1:0]),
        .out_o(m0_out)
    );
    mux_8x1 m1 (
        .in_i(inp_i[11:4]),
        .sel(sel[2:0]),
        .out_o(m1_out)
    );
    mux_4x1 m2 (
        .in_i(inp_i[15:12]),
        .sel(sel[1:0]),
        .out_o(m2_out)
    );
    mux_4x1 m3 (
        .in_i({m2_out, m1_out, m1_out, m0_out}),
        .sel(sel[3:2]),
        .out_o(out_o)
    );
endmodule
