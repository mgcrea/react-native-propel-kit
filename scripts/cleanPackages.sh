#!/bin/bash

rm -rf package-lock.json node_modules; scripts/runPackages.sh "rm -rf node_modules/ lib/"
