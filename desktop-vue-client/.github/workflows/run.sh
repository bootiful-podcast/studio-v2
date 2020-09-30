#!/usr/bin/env bash 

cd $CHECKOUT_DIR
echo "inside ${CHECKOUT_DIR}"
echo "THE PREFIX IS ${TWI_PREFIX}"
echo "========="

echo "VUE_APP_SERVICE_ROOT=https://${TWI_PREFIX}-bookmark-api.cfapps.io" > .env.production
npm install 
npm run build
echo "inside the directory ..."
pwd 
ls -la 
./deploy/cf.sh
./deploy/deploy.sh

