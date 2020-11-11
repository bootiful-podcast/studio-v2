#!/usr/bin/env bash

set -e
set -o pipefail


export APP_NAME=studio
export PROJECT_ID=${GCLOUD_PROJECT}

cd $(dirname $0)/..
root_dir=$(pwd)
cd $root_dir

rm -rf $root_dir/build
rm -rf $root_dir/dist

PROD_ENV_FILE=${root_dir}/.env.production
rm $PROD_ENV_FILE
touch $PROD_ENV_FILE
echo "VUE_APP_SERVICE_ROOT=https://api.${BP_MODE_LOWERCASE}.bootifulpodcast.online" >> ${PROD_ENV_FILE}
echo "VUE_APP_GIT_HASH=${GITHUB_SHA}" >>  ${PROD_ENV_FILE}

npm install && npm run build

mkdir -p ${root_dir}/build/public
cp $root_dir/deploy/nginx-buildpack-config/* ${root_dir}/build
cp -r $root_dir/dist/* ${root_dir}/build/public
cd $root_dir/build

pack build $APP_NAME --builder paketobuildpacks/builder:full --buildpack gcr.io/paketo-buildpacks/nginx:latest  --env PORT=8080
image_id=$(docker images -q $APP_NAME)

GCR_IMAGE_NAME=gcr.io/${PROJECT_ID}/${APP_NAME}
echo "pushing ${image_id} to gcr.io/${PROJECT_ID}/${APP_NAME}"
echo "tagging ${GCR_IMAGE_NAME}"
docker tag "${image_id}" ${GCR_IMAGE_NAME}
echo "finished tag"

docker push ${GCR_IMAGE_NAME}
echo "finished push"

kubectl delete -f ${root_dir}/deploy/deployment.yaml || echo "could not delete existing deployment (maybe it doesn't exist?)"
kubectl apply -f ${root_dir}/deploy/deployment.yaml
kubectl get service $APP_NAME | grep $APP_NAME || kubectl apply -f ${root_dir}/deploy/deployment-service.yaml
