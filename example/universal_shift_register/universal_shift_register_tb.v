`timescale 1ns/1ps

module universal_shift_register_tb;

    reg tb_clk;
    reg tb_rst_n; 
    reg tb_slin_i;
    reg tb_srin_i;
    reg [3:0] tb_pin_i;
    reg [1:0] tb_sel;
    wire [3:0] tb_pout_o;

    universal_shift_reg dut (
        .clk(tb_clk),
        .rst_n(tb_rst_n),
        .slin_i(tb_slin_i),
        .srin_i(tb_srin_i),
        .sel_i(tb_sel),
        .pin_i(tb_pin_i),
        .pout_o(tb_pout_o)
    );

    initial begin
        tb_clk = 0;
        forever #10 tb_clk = ~tb_clk;
    end

    `ifndef TIMEOUT
      `define TIMEOUT 32'd1000
    `endif
    
    integer counter = 0;
    
    always @(posedge tb_clk) begin
        counter <= counter + 1;
        if (counter == `TIMEOUT) begin
            $display("Timeout reached. Ending simulation.");
            $finish;
        end
    end

    initial begin
        $dumpfile("shift_reg_waves.vcd"); 
        $dumpvars;
    end

    initial begin
        tb_rst_n = 1'b0;
        tb_slin_i = 1'b0;
        tb_srin_i = 1'b0;
        tb_sel = 2'b00;
        tb_pin_i = 4'b0000;

        #5 tb_rst_n = 1'b1;

        #15;
        tb_sel = 2'b11;
        tb_pin_i = 4'b1101;
        
        #20;
        tb_sel = 2'b01;
        tb_srin_i = 1'b1;

        #40;
        tb_sel = 2'b10;
        tb_srin_i = 1'b0;
        tb_slin_i = 1'b1;

        #20;
        tb_sel = 2'b00;
        
        #20;
        tb_sel = 2'b10;

        #40;
        tb_sel = 2'b01;
        tb_srin_i = 1'b0;

    end
endmodule
