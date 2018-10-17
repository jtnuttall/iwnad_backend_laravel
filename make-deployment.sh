FILE=iwnad-backend-api.zip;
rm -f ../$FILE;
zip ../$FILE -r * .[^.]* -x "vendor/*";
echo "Done.";
