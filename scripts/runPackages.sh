#!/bin/bash
# @eg bash scripts/runPackages.sh --bail --eval "yarn test"

eval="$1"
excludedPackages=()
exitStatus=0
underline=`tput smul`
nounderline=`tput rmul`

# Flags & options
while [ $# -ne 0 ]
do
  ARG="$1"
  shift # get rid of $1, we saved in ARG already
  case "$ARG" in
  --eval)
    eval="$1"
    shift;;
  --exclude|-x)
    excludedPackages+=("$1")
    shift;;
  --bail|-b)
    bail=1;;
  --only-changed)
    onlyChanged=1;;
  esac
done

allPackages=$(find packages -maxdepth 1 -mindepth 1 -type d | awk -F'/' 'NF!=1{print $2}' | sort -u)
changedPackages=$(git diff @~1 --name-only | grep ^packages/ | awk -F'/' 'NF!=1{print $2}' | sort -u)
[[ $onlyChanged -eq 1 ]] && packages="$changedPackages" || packages="$allPackages"

for package in ${packages[@]}; do
  if [[ " ${excludedPackages[@]} " =~ " ${package} " ]]; then
    continue;
  fi
  cd packages/${package}
  name="${underline}$(basename $(pwd))${nounderline}"
  echo -e "\n📦 ${name}"
  echo "$ ${eval}"
  eval $eval || exitStatus=$?
  if [[ $exitStatus -ne 0 ]]; then
    echo -e "💥 ${name} failed! (exited with ${exitStatus})"
    [[ $bail -eq 1 ]] && exit ${exitStatus}
  else
    echo "✨ ${name} done"
  fi
  cd - > /dev/null
done

echo -ne "\n"

if [[ "$exitStatus" -ne 0 ]]; then
  exit 1;
fi
