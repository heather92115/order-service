#!/bin/bash

SERVICE_NAME=$1
PORT_NUMBER=$2
GITHUB_TEAM_NAME=$3

python3 ./setup_scripts/index.py -n $SERVICE_NAME -p $PORT_NUMBER -t $GITHUB_TEAM_NAME

git add .
git commit -m 'swapped templated values for service values'

yarn install

git add .
git commit -m 'yarn install'

git push origin main

git checkout -b 'pr-for-atlantis'

awk '/PLEASE UPDATE THIS/ { print; print "^^^^^^^ UPDATE THAT ^^^^^^^"; next }1' .infra/terraform/_bootstrap.tf >> .infra/terraform/_bootstrap.tf.tmp
mv .infra/terraform/_bootstrap.tf.tmp .infra/terraform/_bootstrap.tf

git add .infra/terraform/_bootstrap.tf
git commit -m 'PR for Atlantis'
git push origin pr-for-atlantis

git checkout main
