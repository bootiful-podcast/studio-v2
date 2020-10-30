#!/usr/bin/env bash
export APP_NAME=studio
export PROJECT_ID=${GKE_PROJECT:-pgtm-jlong}
cd $(dirname $0)/..
root_dir=$(pwd)
echo "the root dir is ${root_dir} "
cd $root_dir

(curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.14.2/pack-v0.14.2-linux.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)

rm -rf $root_dir/build
rm -rf $root_dir/dist

echo "GIT_HASH=${GITHUB_SHA}" >> $root_dir/.env.production

npm install && npm run build

kubectl delete $root_dir/deploy/deployment.yaml

mkdir -p ${root_dir}/build/public
cp $root_dir/deploy/nginx-buildpack-config/* ${root_dir}/build
cp -r $root_dir/dist/* ${root_dir}/build/public
cd $root_dir/build


pack build $APP_NAME --builder  paketobuildpacks/builder:full --buildpack gcr.io/paketo-buildpacks/nginx:latest  --env PORT=8080
image_id=$(docker images -q $APP_NAME)
docker tag "${image_id}" gcr.io/${PROJECT_ID}/${APP_NAME}
docker push gcr.io/${PROJECT_ID}/${APP_NAME}


kubectl delete -f ${root_dir}/deploy/deployment.yaml
kubectl apply -f ${root_dir}/deploy/deployment.yaml
