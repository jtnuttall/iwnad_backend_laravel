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
cd $FRONTEND && ember build --environment staging && cd ..;
# clear public
rm -Rf $BACKEND/public/assets;
rm -Rf $BACKEND/public/fonts;
rm -Rf $BACKEND/public/index.html;
rm -Rf $BACKEND/public/crossdomain.xml;
# copy the new Ember build into the Laravel application
cp -R $FORNTEND/dist/assets $BACKEND/public
cp -R $FRONTEND/dist/fonts $BACKEND/public
cp -R $FRONTEND/dist/index.html $BACKEND/resources/views/index.blade.php
cp -R $FRONTEND/dist/crossdomain.xml $BACKEND/public
# git commit
git add .
git commit -a -m "Fresh Staging build"
git push origin staging

# switch back to master
git checkout master