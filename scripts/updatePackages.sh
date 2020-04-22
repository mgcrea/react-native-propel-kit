#!/bin/bash

set -e # terminate on first failure

command=${1:-""}
rejects="--reject react,react-native"

packages=$(
  find packages -maxdepth 1 -mindepth 1 -type d -print0 | xargs -0
)

for module in ${packages[@]}; do
  cd ${module}
  echo -e "\n🏛 $(basename $(pwd))"
  echo "$ ncu ${rejects} ${command}"
  ncu --dep prod ${rejects} ${command}
  ncu --dep dev ${command}
  cd - > /dev/null
done
