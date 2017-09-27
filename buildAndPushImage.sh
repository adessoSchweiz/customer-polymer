#!/usr/bin/env bash

./buildJSAR.sh

docker build -t adesso/customer-polymer:1.0.6 .
# docker push adesso/customer-polymer:1.0.6