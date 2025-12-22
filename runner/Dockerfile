FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y iverilog && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY run.sh /work/run.sh
RUN chmod +x /work/run.sh

ENTRYPOINT ["/work/run.sh"]
