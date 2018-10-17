FILE=iwnad-backend-api.zip;

git checkout staging

rm -f $FILE;
zip $FILE -r * .[^.]* -x "vendor/*";
echo "Done.";

git checkout master