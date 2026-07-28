`timescale 1ns/1ns

module fsm_pattern_detection_mealy_tb;
    reg tb_clk;
    reg tb_rst;
    reg tb_in_i;
    wire tb_detect;

    reg [31:0] test_vector; 
    integer i;
	 
    fsm_pattern_detection_mealy dut (
        .clk(tb_clk),
        .rst(tb_rst),
        .in_i(tb_in_i),
        .detect(tb_detect)
    );

    initial begin
        tb_clk = 0;
        forever #16 tb_clk = ~tb_clk;
    end

    initial begin
        $dumpfile("mealy_waves.vcd");
        $dumpvars(0, tb_top);
    end


    initial begin
        tb_rst = 1;
        tb_in_i = 0;
        test_vector = 32'hFDCAE398; 
        
        #40; 
        @(negedge tb_clk);
        tb_rst = 0;

        for (i = 31; i >= 0; i = i - 1) begin
            tb_in_i = test_vector[i];
            
            @(negedge tb_clk); 
            
            $display("Time=%0t | Bit=%b | State=%b | Detect=%b", 
                     $time, tb_in_i, dut.currState, tb_detect);
        end

        #50;
        $finish;
    end

endmodule
