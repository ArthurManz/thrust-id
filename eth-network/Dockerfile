FROM ethereum/client-go:alpine
MAINTAINER Maxim B. Belooussov <belooussov@gmail.com> Toon Leijtens <toon.leijtens@gmail.com>

ENV DATA_DIR /root/.ethereum
ARG NETWORKID=42
ARG NETWORKPORT=30303
ARG ETHSTATSPORT=3000
ARG MINERPORT=8545
ENV NETWORKID $NETWORKID
ENV ETHSTATSPORT $ETHSTATSPORT
ENV MINERPORT $MINERPORT
ENV NETWORKPORT $NETWORKPORT
ENV SUBNET 42.42.42

RUN mkdir $DATA_DIR

COPY artifacts/genesis.json $DATA_DIR/genesis.json
COPY artifacts/credentials.* $DATA_DIR/
COPY artifacts/key.* /root/
COPY artifacts/static-nodes.json /root/.ethereum/static-nodes.json

RUN for i in GovernmentAdmin GovernmentRead GovernmentCreate UNAdmin UNRead UNCreate RedCrossAdmin RedCrossCreate RedCrossRead; do \
    /geth --password $DATA_DIR/credentials.$i --datadir=$DATA_DIR account new > $DATA_DIR/$i.id; \
    sed -i "s/Address: {//g" $DATA_DIR/$i.id; \
    sed -i "s/}//g" $DATA_DIR/$i.id; \
    sed -i "s/$i/0x$(cat $DATA_DIR/$i.id)/" $DATA_DIR/genesis.json; \
    done

RUN /geth --networkid $NETWORKID init $DATA_DIR/genesis.json && \
    apk update && \
    apk add nodejs && \
    apk add python && \
    apk add g++ && \
    apk add make && \
    apk add git && \
    git clone https://github.com/ing-bank/eth-netstats &&\
    cd /eth-netstats && npm install &&\
    cd /eth-netstats && npm install -g grunt-cli &&\
    cd /eth-netstats && grunt && \
    cd &&\
    git clone https://github.com/ing-bank/eth-net-intelligence-api.git /eth-net-intelligence-api

COPY artifacts/app.json /eth-net-intelligence-api

RUN cd /eth-net-intelligence-api &&\
    npm install -d &&\
    npm install pm2 -g

ENV WS_SECRET g3heim
EXPOSE $ETHSTATSPORT
EXPOSE $MINERPORT
EXPOSE $NETWORKPORT
COPY artifacts/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
