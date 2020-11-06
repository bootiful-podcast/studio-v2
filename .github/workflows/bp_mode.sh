#!/usr/bin/env bash

export BP_MODE="DEVELOPMENT"

if [ "$GITHUB_EVENT_NAME" = "create" ]; then
  if [[ "${GITHUB_REF}" =~ "tags" ]]; then
    BP_MODE="PRODUCTION"
  fi
fi

BP_MODE_LOWERCASE=$(echo "${BP_MODE}" | tr '[:upper:]' '[:lower:]')
echo "BP_MODE_LOWERCASE=$BP_MODE_LOWERCASE"  >> $GITHUB_ENV
echo "BP_MODE=${BP_MODE}" >> $GITHUB_ENV
echo "the BP_MODE is '${BP_MODE}'"

function resolve_variable_by_mode(){
  NV=${1}_${BP_MODE}
  INDIRECT_VALUE=${!NV}
  echo $NV
  ASSIGNMENT="export ${1}=$INDIRECT_VALUE"
  eval $ASSIGNMENT
}

resolve_variable_by_mode GCLOUD_ZONE
resolve_variable_by_mode GCLOUD_PROJECT

echo "GCLOUD_ZONE=$GCLOUD_ZONE" >> $GITHUB_ENV
echo "GCLOUD_PROJECT=$GCLOUD_PROJECT" >> $GITHUB_ENV

# you could bifurcate by cluster name
GKE_CLUSTER_NAME=bootiful-podcast-${BP_MODE_LOWERCASE}
echo "GKE_CLUSTER_NAME=${GKE_CLUSTER_NAME}" >> $GITHUB_ENV
