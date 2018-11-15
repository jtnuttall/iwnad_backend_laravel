#!/usr/bin/env bash

FRONTEND="../testing_iwand_website/FrontEnd";
BACKEND=".";
BRANCH=master

# PUBLISH STAGING

# build the Ember application
cd $FRONTEND;
rm -rvf dist;
ember build --environment $BRANCH;
git checkout $BRANCH;
cd -;
# copy the new Ember build into the Laravel application
cp -Rvf $FRONTEND/dist/assets $BACKEND/public
cp -Rvf $FRONTEND/dist/fonts $BACKEND/public
cp -Rvf $FRONTEND/dist/index.html $BACKEND/resources/views/index.blade.php
cp -Rvf $FRONTEND/dist/crossdomain.xml $BACKEND/public
