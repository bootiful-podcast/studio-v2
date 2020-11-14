#!/usr/bin/env bash

# todo fix this
export BP_MODE="DEVELOPMENT"
#export BP_MODE="PRODUCTION"

## so you can either push a tag or issue a dispatch event
if [ "$GITHUB_EVENT_NAME" = "create" ]; then
  if [[ "${GITHUB_REF}" =~ "tags" ]]; then
    BP_MODE="PRODUCTION"
  fi
fi

if [ "$GITHUB_EVENT_NAME" = "repository_dispatch" ]; then

  EVENT=$( cat $GITHUB_EVENT_PATH | jq '.action' -r )
  if  [ "$EVENT" = "deploy-production-event" ]; then
    BP_MODE="PRODUCTION"
    echo "Building for production..."
  fi
fi

#echo $GITHUB_EVENT_NAME
#echo $GITHUB_EVENT_PATH
#cat $GITHUB_EVENT_PATH


BP_MODE_LOWERCASE=$(echo "${BP_MODE}" | tr '[:upper:]' '[:lower:]')
echo "BP_MODE_LOWERCASE=$BP_MODE_LOWERCASE"  >> $GITHUB_ENV
echo "BP_MODE=${BP_MODE}" >> $GITHUB_ENV
echo "the BP_MODE is '${BP_MODE}'"

function resolve_variable_by_mode(){
  NV=${1}_${BP_MODE}
  INDIRECT_VALUE=${!NV}
  echo $NV
  ASSIGNMENT="export ${1}=$INDIRECT_VALUE"
  echo $ASSIGNMENT
  eval $ASSIGNMENT
}



resolve_variable_by_mode GCLOUD_ZONE
resolve_variable_by_mode GCLOUD_PROJECT

echo "GCLOUD_ZONE=$GCLOUD_ZONE" >> $GITHUB_ENV
echo "GCLOUD_PROJECT=$GCLOUD_PROJECT" >> $GITHUB_ENV

# you could bifurcate by cluster name
GKE_CLUSTER_NAME=bootiful-podcast-${BP_MODE_LOWERCASE}
echo "GKE_CLUSTER_NAME=${GKE_CLUSTER_NAME}" >> $GITHUB_ENV




