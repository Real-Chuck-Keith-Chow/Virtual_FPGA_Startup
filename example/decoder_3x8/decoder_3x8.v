module decoder_3x8 (
    input  wire       enable,
    input  wire [2:0] in_i,
    output reg  [7:0] out_o
);

    always @(*) begin
        if (!enable) begin
            out_o = 8'b00000000;
        end else begin
            out_o = (8'b1 << in_i);
        end
    end
endmodule
