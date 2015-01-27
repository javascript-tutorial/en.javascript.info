#!/bin/bash

source ./export-plunks.sh

git commit -a -m renovations
git push origin master
