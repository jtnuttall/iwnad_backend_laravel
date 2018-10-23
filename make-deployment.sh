FILE=iwnad-backend-api.zip;

git checkout staging

rm -f $FILE;
cp -vf .env_production .env
zip $FILE -r * .[^.]* -x "vendor/*" -x ".git/*"
cp -vf .env_local .env
echo "Done.";

git checkout master
