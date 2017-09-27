#!/usr/bin/env bash

bower install

mkdir target
mkdir target/webcomponentsjs
cp bower_components/webcomponentsjs/webcomponents-lite.js target/webcomponentsjs/webcomponents-lite.js
cp -r bower_components/polymer target

mkdir target/customer
cp src/customer/customer.html target/customer/customer.html
cp src/customer/customer.js target/customer/customer.js
cp src/customer/customer-style.html target/customer/customer-style.html

mkdir target/environment
cp environment-prod/variables.json target/environment/variables.json

cp src/index.html target/index.html

cd target
zip -r jsar.zip .
cd ..
mv target/jsar.zip .