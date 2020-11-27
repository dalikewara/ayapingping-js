#!/bin/sh
git checkout development && git add . && git add -u && 
git commit -m "add documentation plugin" && git push origin development && git checkout testing && git merge development && git push origin testing && git checkout master && git merge testing && git push origin master &&
git tag -a v3.0.15 -m "ayapingping-js v3.0.15" && git push --tags && npm publish && git checkout development && git branch