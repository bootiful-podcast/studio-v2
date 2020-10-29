#!/usr/bin/env bash
ROOT_DIR=$(cd `dirname $0`/.. && pwd ) 
echo $ROOT_DIR
cd $ROOT_DIR 
npm run build 
$HOME/josh-env/bin/serve.sh  8081 $ROOT_DIR/dist
