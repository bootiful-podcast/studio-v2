#!/bin/bash
set -e



function deploy_system_app() {
  APP_NAME=$1
  echo "Deploying $APP_NAME to environment $BP_MODE_LOWERCASE "

  if [ -z "${GH_PERSONAL_ACCESS_TOKEN}" ]
  then
    echo "The Github personal access token is empty!"
    exit 1
  fi

  echo "Trying to invoke the deployment for ${APP_NAME}."

  PAYLOAD='{"event_type":"deploy-development-event"}'

  if [ "$BP_MODE_LOWERCASE" = "production" ]; then
    PAYLOAD='{"event_type":"deploy-production-event"}'
  fi

  echo $(curl -X POST -H "Accept: application/vnd.github.v3+json" \
      -H "Authorization: token ${GH_PERSONAL_ACCESS_TOKEN}" https://api.github.com/repos/bootiful-podcast/${APP_NAME}/dispatches -d $PAYLOAD )
}


export BP_MODE_LOWERCASE=${1:-development}
export GH_PERSONAL_ACCESS_TOKEN=${GH_PERSONAL_ACCESS_TOKEN:-$GITHUB_PERSONAL_ACCESS_TOKEN}
export APP=${2:-deployment}

git commit -am "$(date)" && git push || echo "nothing to commit and push.."
deploy_system_app $APP
