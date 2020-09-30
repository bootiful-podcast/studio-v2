#!/usr/bin/env bash
cd `dirname $0` 
npm run build 
$HOME/josh-env/bin/serve.sh  8081 dist
