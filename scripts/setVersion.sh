#!/bin/bash

exitStatus=0
underline=`tput smul`
nounderline=`tput rmul`
WORKSPACE_VERSION=$(jq -r '.version' package.json)
VERSION=${1:-${WORKSPACE_VERSION}}

allPackages=$(find packages -maxdepth 1 -mindepth 1 -type d | awk -F'/' 'NF!=1{print $2}' | sort -u)
for package in ${allPackages[@]}; do
  cd packages/${package}
  name="${underline}$(basename $(pwd))${nounderline}"
  echo -e "\n📦 ${name}"
  echo "$ jq ".version = \"${VERSION}\"" package.json | sponge package.json"
  jq ".version = \"${VERSION}\"" package.json | sponge package.json || exitStatus=$?
  workspaceDependencies=$(jq -r '.dependencies | with_entries(select(.key|startswith("@mgcrea/"))) | keys | .[]' package.json 2> /dev/null)
  for workspaceDependency in ${workspaceDependencies[@]}; do
    echo "$ jq ".dependencies[\"${workspaceDependency}\"] = \"${VERSION}\"" package.json | sponge package.json"
    jq ".dependencies[\"${workspaceDependency}\"] = \"${VERSION}\"" package.json | sponge package.json || exitStatus=$?
  done
  workspaceDevDependencies=$(jq -r '.devDependencies | with_entries(select(.key|startswith("@mgcrea/"))) | keys | .[]' package.json 2> /dev/null)
  for workspaceDevDependency in ${workspaceDevDependencies[@]}; do
    echo "$ jq ".devDependencies[\"${workspaceDevDependency}\"] = \"${VERSION}\"" package.json | sponge package.json"
    jq ".devDependencies[\"${workspaceDevDependency}\"] = \"${VERSION}\"" package.json | sponge package.json || exitStatus=$?
  done
  if [[ $exitStatus -ne 0 ]]; then
    echo -e "💥 ${name} failed! (exited with ${exitStatus})"
    [[ $bail -eq 1 ]] && exit ${exitStatus}
  else
    echo "✨ ${name} done"
  fi
  cd - > /dev/null
done
