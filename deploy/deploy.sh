#!/usr/bin/env bash
export APP_NAME=bp-view
export PROJECT_ID=${GKE_PROJECT:-pgtm-jlong}
cd $(dirname $0)/..
root_dir=$(pwd)
echo "the root dir is ${root_dir} " 
cd $root_dir 


## install Pack 
(curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.14.2/pack-v0.14.2-linux.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)



rm -rf $root_dir/build
rm -rf $root_dir/dist 

npm install
npm run build 


kubectl delete $root_dir/deploy/deployment.yaml

## stage the build for containerization
mkdir -p ${root_dir}/build/public
cp $root_dir/deploy/nginx-buildpack-config/* ${root_dir}/build
cp -r $root_dir/dist/* ${root_dir}/build/public
cd $root_dir/build 

# mkdir -p ${root_dir}/build/public
# cp $root_dir/deploy/nginx-buildpack-config/* ${root_dir}/build
# echo "<h1>Hello, world</h1>" > ${root_dir}/build/public/index.html 
# cd $root_dir/build 


pack build $APP_NAME --builder  paketobuildpacks/builder:full --buildpack gcr.io/paketo-buildpacks/nginx:latest  --env PORT=8080

## deploy the newly minted container to our K8s cluster
image_id=$(docker images -q $APP_NAME)
docker tag "${image_id}" gcr.io/${PROJECT_ID}/${APP_NAME}
docker push gcr.io/${PROJECT_ID}/${APP_NAME}
# docker pull gcr.io/${PROJECT_ID}/${APP_NAME}:latest
kubectl apply -f ${root_dir}/deploy/deployment.yaml 
# this works! 
# docker run -p 9090:9090 -e PORT=9090 bp-view
# kubectl describe services $APP_NAME