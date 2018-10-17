#!/usr/bin/env bash

FRONTEND="../testing_iwand_website/FrontEnd";

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
rm -Rf backend/public/assets;
rm -Rf backend/public/fonts;
rm -Rf backend/public/index.html;
rm -Rf backend/public/crossdomain.xml;
# copy the new Ember build into the Laravel application
cp -R frontend/dist/assets backend/public
cp -R frontend/dist/fonts backend/public
cp -R frontend/dist/index.html backend/resources/views/index.blade.php
cp -R frontend/dist/crossdomain.xml backend/public
# git commit
git add .
git commit -a -m "Fresh Staging build"
git push origin staging

# switch back to master
git checkout master