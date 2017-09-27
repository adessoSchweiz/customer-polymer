#!/usr/bin/env bash

docker stop polymer-demo
docker rm polymer-demo

docker run -d \
  --name polymer-demo \
  -p 8888:8080 \
  adesso/customer-polymer:1.0.6

docker logs -f polymer-demo