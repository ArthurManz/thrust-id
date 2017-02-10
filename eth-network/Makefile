AUTHOR=banking
NAME=ethnetwork
NETWORKID=42
NETWORKPORT=30303
SUBNET=10.0.42
VERSION=latest
PWD=/dockerbackup
NETWORKNAME=icec
MINERPORT=8545
ETHSTATSPORT=3000

build:
	docker build --build-arg=NETWORKID=$(NETWORKID) --build-arg=NETWORKPORT=$(NETWORKPORT) --build-arg=MINERPORT=$(MINERPORT) --build-arg=ETHSTATSPORT=$(ETHSTATSPORT) -t $(AUTHOR)/$(NAME):$(VERSION) .

start: network miner node1 node2 ethstats ethstatsclient

stop:
	docker stop -t 0 miner
	docker stop -t 0 node1
	docker stop -t 0 node2
	docker stop -t 0 ethstats
	docker stop -t 0 ethstatsclient

clean:
	docker rm -f miner
	docker rm -f node1
	docker rm -f node2
	docker rm -f ethstats
	docker rm -f ethstatsclient
	docker network rm $(NETWORKNAME)

cleanrestart: clean start

network:
	docker network create --subnet $(SUBNET).0/24 --gateway $(SUBNET).254 $(NETWORKNAME)

datavolumes:
	docker run -d -v ethereumminer:/root --name data-eth_miner --entrypoint /bin/echo $(AUTHOR)/$(NAME):$(VERSION)
	docker run -d -v ethereumnode1:/root --name data-eth_node1 --entrypoint /bin/echo $(AUTHOR)/$(NAME):$(VERSION)
	docker run -d -v ethereumnode2:/root --name data-eth_node2 --entrypoint /bin/echo $(AUTHOR)/$(NAME):$(VERSION)

backup:
	docker pause miner node1 node2 ethstatsclient ethstats
	docker run --rm --volumes-from data-eth_miner -v $(PWD):/backup debian:wheezy bash -c "tar zcvf /backup/ethereumbackup.tgz root"
	docker unpause miner node1 node2 ethstatsclient ethstats

restore:
	docker run --rm --volumes-from data-eth_miner -v $(PWD):/backup debian:wheezy bash -c "tar zxvf /backup/ethereumbackup.tgz"

rmnetwork:
	docker network rm $(NETWORKNAME)

help:
	docker run -i $(AUTHOR)/$(NAME):$(VERSION) help

miner:
	docker run -d --name=miner -h miner -m 2G --net $(NETWORKNAME) --ip $(SUBNET).1 -e SUBNET=$(SUBNET) --volumes-from data-eth_miner -p $(MINERPORT):$(MINERPORT) $(AUTHOR)/$(NAME):$(VERSION) miner

node1:
	docker run -d --name=node1 -h node1 -m 2G --net $(NETWORKNAME) --ip $(SUBNET).2 -e SUBNET=$(SUBNET) --volumes-from data-eth_node1 $(AUTHOR)/$(NAME):$(VERSION) node1

node2:
	docker run -d --name=node2 -h node2 -m 2G --net $(NETWORKNAME) --ip $(SUBNET).3 -e SUBNET=$(SUBNET) --volumes-from data-eth_node2 $(AUTHOR)/$(NAME):$(VERSION) node2

ethstatsclient:
	docker run -d --name=ethstatsclient -h ethstatsclient -m 2G --net $(NETWORKNAME) --ip $(SUBNET).243 -e SUBNET=$(SUBNET) $(AUTHOR)/$(NAME):$(VERSION) ethstatsclient

ethstats:
	docker run -d --name=ethstats -h ethstats -m 2G --net $(NETWORKNAME) --ip $(SUBNET).242 -e SUBNET=$(SUBNET) -p $(ETHSTATSPORT):$(ETHSTATSPORT) $(AUTHOR)/$(NAME):$(VERSION) ethstats

console: ciminer

ciminer:
	docker exec -ti miner /geth attach

cinode1:
	docker exec -ti node1 /geth attach

cinode2:
	docker exec -ti node2 /geth attach
