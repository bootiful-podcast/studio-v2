#!/usr/bin/env bash
source "$(cd $(dirname $0) && pwd)/env.sh"


mkdir -p $HOME/bin
cp ./deploy/cf-6.23.1 $HOME/bin/cf
cf login  -u $CF_USER -a $CF_API -o $CF_ORG -p $CF_PASSWORD -s $CF_SPACE
cf install-plugin -f ./deploy/scheduler-for-pcf-cliplugin-linux64-binary-1.1.0




