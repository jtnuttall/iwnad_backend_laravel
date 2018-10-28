#!/usr/bin/env bash

FRONTEND="../testing_iwand_website/FrontEnd";
BACKEND=".";

# PUBLISH STAGING

# make sure we're in the master branch
git checkout master
git add .
git commit -a -m "Pre-publish commit"
git push
# switch to staging branch
git checkout staging
# merge master into staging
git merge master
# build the Ember application
cd $FRONTEND;
ember build --environment staging;
git checkout staging;
cd -;
# copy the new Ember build into the Laravel application
cp -Rvf $FRONTEND/dist/assets $BACKEND/public
cp -Rvf $FRONTEND/dist/fonts $BACKEND/public
cp -Rvf $FRONTEND/dist/index.html $BACKEND/resources/views/index.blade.php
cp -Rvf $FRONTEND/dist/crossdomain.xml $BACKEND/public
# git commit
git add .
git commit -a -m "Fresh Staging build"
git push origin staging

# switch back to master
git checkout master
